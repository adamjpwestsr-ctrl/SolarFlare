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

// FIXED: Named imports
import { usePlayerMovement } from "./hooks/usePlayerMovement";
import { useCollisionDetection } from "./hooks/useCollisionDetection";

import useZoneController from "./hooks/useZoneController";
import useBurstManager from "./hooks/useBurstManager";
import useHazardFlash from "./hooks/useHazardFlash";

import { syncCollectible, syncScore } from "./lib/supabaseSync";
import { calculateScore } from "./lib/scoring";

import zones from "./data/zones.json";

const GAME_WIDTH = 900;
const GAME_HEIGHT = 600;

export default function GameContainer() {
  const [explorerId] = useState("demo-explorer");
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showZoneIntro, setShowZoneIntro] = useState(true);

  // Zone progression
  const { zone, nextZone, resetZones, transitioning, zoneComplete, completeZone } =
    useZoneController(zones);

  // Player movement
const { position: player, direction } = usePlayerMovement({
  speed: 6,
  bounds: { width: GAME_WIDTH, height: GAME_HEIGHT }
});


  // Collision detection
  useCollisionDetection({
  player,
  obstacles,
  collectibles,
  onHitObstacle: (obs) => {
    triggerFlash();
    setIsGameOver(true);
    syncScore(explorerId, zone.id, score);
  },
  onCollect: (col) => {
    const newScore = score + col.points;
    setScore(newScore);

    syncCollectible(explorerId, col.id, col.points);
    spawnBurst(col.x, col.y, col.rarity);

    setCollectibles((prev) => prev.filter((c) => c.id !== col.id));
  }
});


  // Managers
  const [obstacles, setObstacles] = useState([]);
  const [collectibles, setCollectibles] = useState([]);

  const handleObstacleUpdate = (list) => setObstacles(list);
  const handleCollectibleUpdate = (list) => setCollectibles(list);

  const { bursts, spawnBurst } = useBurstManager();
  const { flashes, triggerFlash } = useHazardFlash();

  // GAME LOOP
  useEffect(() => {
    if (isPaused || isGameOver || showZoneIntro || transitioning || zoneComplete) return;

    const interval = setInterval(() => {
      // Obstacle collision
      const hitObstacle = checkObstacleCollision(player, obstacles);
      if (hitObstacle) {
        triggerFlash();
        setIsGameOver(true);
        syncScore(explorerId, zone.id, score);
        return;
      }

      // Collectible collision
      const hitCollectible = checkCollectibleCollision(player, collectibles);
      if (hitCollectible) {
        const newScore = score + hitCollectible.points;
        setScore(newScore);

        syncCollectible(explorerId, hitCollectible.id, hitCollectible.points);

        spawnBurst(hitCollectible.x, hitCollectible.y, hitCollectible.rarity);

        setCollectibles((prev) => prev.filter((c) => c.id !== hitCollectible.id));
      }

      // Zone completion trigger
      if (player.x > GAME_WIDTH - 60) {
        completeZone();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [
    player,
    obstacles,
    collectibles,
    isPaused,
    isGameOver,
    showZoneIntro,
    transitioning,
    zoneComplete,
    score,
    zone,
    explorerId,
    spawnBurst,
    triggerFlash,
    checkObstacleCollision,
    checkCollectibleCollision
  ]);

  const restartGame = () => {
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    resetZones();
    setShowZoneIntro(true);
  };

  return (
    <div className="relative mx-auto mt-10" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
      {/* Zone Intro */}
      {showZoneIntro && (
        <ZoneIntro
          zoneName={zone.name}
          onBegin={() => setShowZoneIntro(false)}
        />
      )}

      {/* Zone Completion Cinematic */}
      {zoneComplete && (
        <ZoneComplete
          zoneName={zone.name}
          score={score}
          onContinue={nextZone}
        />
      )}

      {/* HUD */}
      {!isGameOver && !showZoneIntro && !zoneComplete && (
        <GameHUD
          score={score}
          zoneName={zone.name}
          onPause={() => setIsPaused(true)}
        />
      )}

      {/* Pause Menu */}
      {isPaused && (
        <PauseMenu
          onResume={() => setIsPaused(false)}
          onQuit={restartGame}
        />
      )}

      {/* Game Over */}
      {isGameOver && (
        <GameOverScreen
          score={score}
          zoneName={zone.name}
          onRestart={restartGame}
        />
      )}

      {/* Game Canvas */}
      <GameCanvas
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        player={player}
        obstacles={obstacles}
        collectibles={collectibles}
        zone={zone}
        transitioning={transitioning}
      />

      {/* Player */}
      <Player
        x={player.x}
        y={player.y}
        radius={player.radius}
        direction={direction}
        transitioning={transitioning}
      />

      {/* Managers */}
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

      {/* Burst Effects */}
      {bursts.map((b) => (
        <CollectibleBurst key={b.id} {...b} />
      ))}

      {/* Hazard Impact Flash */}
      {flashes.map((f) => (
        <HazardFlash key={f} />
      ))}
    </div>
  );
}
