"use client";

import Image from "next/image";
import Player from "./Player";
import Obstacle from "./Obstacle";
import Collectible from "./Collectible";

interface Entity {
  id: string;
  x: number;
  y: number;
  radius: number;
  type: string;
  name?: string;
  points?: number;
  rarity?: string;
}

interface GameCanvasProps {
  width: number;
  height: number;
  player: { x: number; y: number; radius: number; direction?: string };
  obstacles: Entity[];
  collectibles: Entity[];
  zone: {
    id: string;
    name: string;
    background: string;
    hazards: string[];
    collectibles: string[];
  };
  transitioning: boolean;
}

export default function GameCanvas({
  width,
  height,
  player,
  obstacles,
  collectibles,
  zone,
  transitioning
}: GameCanvasProps) {
  return (
    <div
      className={`
        relative border border-white/20 rounded-2xl overflow-hidden shadow-2xl
        ${transitioning ? "zone-transition-out zone-warp" : "zone-transition-in"}
      `}
      style={{ width, height }}
    >
      {/* Starfield Background */}
      <div className="absolute inset-0 z-0">
        <div className={`starfield-layer slow ${transitioning ? "zone-starfield-boost" : ""}`} />
        <div className={`starfield-layer fast ${transitioning ? "zone-starfield-boost" : ""}`} />
      </div>

      {/* Zone Background */}
      <Image
        src={zone.background}
        alt={`${zone.name} background`}
        fill
        className={`object-cover opacity-60 z-0 ${transitioning ? "zone-warp" : ""}`}
      />

      {/* Collectibles */}
      <div className="absolute inset-0 z-10">
        {collectibles.map((c) => (
          <Collectible
            key={c.id}
            id={c.id}
            x={c.x}
            y={c.y}
            radius={c.radius}
            name={c.name ?? "Unknown"}
            points={c.points ?? 0}
            rarity={c.rarity ?? "common"}
          />
        ))}
      </div>

      {/* Obstacles */}
      <div className="absolute inset-0 z-20">
        {obstacles.map((o) => (
          <Obstacle key={o.id} {...o} />
        ))}
      </div>

      {/* Player */}
      <div className="absolute inset-0 z-30">
        <Player
          x={player.x}
          y={player.y}
          radius={player.radius}
          direction={player.direction ?? null}
          transitioning={transitioning}
        />
      </div>
    </div>
  );
}
