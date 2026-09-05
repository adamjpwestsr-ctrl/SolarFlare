"use client";

import { useState, useEffect } from "react";
import GameCanvas from "./components/GameCanvas";
import Player from "./components/Player";
import GameHUD from "./components/GameHUD";
import PauseMenu from "./components/PauseMenu";
import GameOverScreen from "./components/GameOverScreen";
import ZoneIntro from "./components/ZoneIntro";

import ObstacleManager from "./components/ObstacleManager";
import CollectibleManager from "./components/CollectibleManager";
import CollectibleBurst from "./components/CollectibleBurst";
import HazardFlash from "./components/HazardFlash";
import ZoneComplete from "./components/ZoneComplete";

import { usePlayerMovement } from "./hooks/usePlayerMovement";
import { useCollisionDetection } from "./hooks/useCollisionDetection";

import useZoneController from "./hooks/useZoneController";
import useBurstManager from "./hooks/useBurstManager";
import useHazardFlash from "./hooks/useHazardFlash";

import { syncCollectible, syncScore } from "./lib/supabaseSync";
import zones from "./data/zones.json";

const GAME_WIDTH = 900;
const GAME_HEIGHT = 600;

export default function GameContainer() {
  const [explorerId] = useState("demo-explorer");

  // NEW — Start Game state
  const [gameStarted, setGameStarted] = useState(false);

  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showZoneIntro, setShowZoneIntro] = useState(false); // now false until game starts

  // Zone progression
  const { zone, nextZone, resetZones, transitioning, zoneComplete, completeZone } =
    useZoneController(zones);

  // Player movement
  const { position, direction } = usePlayerMovement({
    speed: 6,
    bounds: { width: GAME_WIDTH, height: GAME_HEIGHT }
  });

  const player = { ...position, radius: 20 };

  // Managers
  const [obstacles, setObstacles] = useState([]);
  const [collectibles, setCollectibles] = useState([]);

  const handleObstacleUpdate = (list) => setObstacles(list);
  const handleCollectibleUpdate = (list) => setCollectibles(list);

  const { bursts, spawnBurst } = useBurstManager();
  const { flashes, triggerFlash } = useHazardFlash();

  // Collision detection — only after game starts AND managers have populated
  useEffect(() => {
    if (!gameStarted) return;
    if (obstacles.length === 0 && collectibles.length === 0) return;

    useCollisionDetection({
      player,
      obstacles,
      collectibles,
      onHitObstacle: (obs) => {
        if (!obs) return;
        triggerFlash();
        setIsGameOver(true);

        // Disable Supabase sync for demo mode
        if (explorerId !== "demo-explorer") {
          syncScore(explorerId, zone.id, score);
        }
      },
      onCollect: (col) => {
        if (!col) return;

        const newScore = score + col.points;
        setScore(newScore);

        if (explorerId !== "demo-explorer") {
          syncCollectible(explorerId, col.id, col.points);
        }

        spawnBurst(col.x, col.y, col.rarity);
        setCollectibles((prev) => prev.filter((c) => c.id !== col.id));
      }
    });
  }, [gameStarted, player, obstacles, collectibles, score, explorerId, zone.id]);

  // GAME LOOP — only runs when game is active
  useEffect(() => {
    if (!gameStarted) return;
    if (isPaused || isGameOver || showZoneIntro || transitioning || zoneComplete) return;

    const interval = setInterval(() => {
      if (player.x > GAME_WIDTH - 60) {
        completeZone();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [
    gameStarted,
    player,
    isPaused,
    isGameOver,
    showZoneIntro,
    transitioning,
    zoneComplete,
    completeZone
  ]);

  const startGame = () => {
    setGameStarted(true);
    setShowZoneIntro(true);
  };

  const restartGame = () => {
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    resetZones();
    setShowZoneIntro(true);
    setGameStarted(true);
  };

  return (
    <div className="relative mx-auto mt-10" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
      
      {/* START GAME SCREEN */}
      {!gameStarted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white z-50">
          <h1 className="text-4xl font-bold mb-6">Astronaut Explorer</h1>
          <button
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-xl"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      )}

      {/* Zone Intro */}
      {gameStarted && showZoneIntro && (
        <ZoneIntro
          zoneName={zone.name}
          onBegin={() => setShowZoneIntro(false)}
        />
      )}

      {/* Zone Completion Cinematic */}
      {gameStarted && zoneComplete && (
        <ZoneComplete
          zoneName={zone.name}
          score={score}
          onContinue={nextZone}
        />
      )}

{/* HUD */}
{gameStarted && !isGameOver && !showZoneIntro && !zoneComplete && (
  <GameHUD
    score={score}
    zoneName={zone.name}
    player={player}
    obstacles={obstacles}
    collectibles={collectibles}
    onPause={() => setIsPaused(true)}
  />
)}

      {/* Pause Menu */}
      {gameStarted && isPaused && (
        <PauseMenu
          onResume={() => setIsPaused(false)}
          onQuit={restartGame}
        />
      )}

      {/* Game Over */}
      {gameStarted && isGameOver && (
        <GameOverScreen
          score={score}
          zoneName={zone.name}
          onRestart={restartGame}
        />
      )}

      {/* Game Canvas */}
      {gameStarted && (
        <GameCanvas
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          player={player}
          obstacles={obstacles}
          collectibles={collectibles}
          zone={zone}
          transitioning={transitioning}
        />
      )}

      {/* Player */}
      {gameStarted && (
        <Player
          x={player.x}
          y={player.y}
          radius={player.radius}
          direction={direction}
          transitioning={transitioning}
        />
      )}

      {/* Managers */}
      {gameStarted && (
        <>
          <ObstacleManager
            zone={zone}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            transitioning={transitioning}
            onUpdate={handleObstacleUpdate}
          />

          <CollectibleManager
            zone={zone}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            onUpdate={handleCollectibleUpdate}
          />
        </>
      )}

      {/* Burst Effects */}
      {gameStarted &&
        bursts.map((b) => <CollectibleBurst key={b.id} {...b} />)}

      {/* Hazard Impact Flash */}
      {gameStarted &&
        flashes.map((f) => <HazardFlash key={f} />)}
    </div>
  );
}
