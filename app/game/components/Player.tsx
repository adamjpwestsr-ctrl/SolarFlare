"use client";

import Image from "next/image";
import Thruster from "./Thruster"; // NEW

interface PlayerProps {
  x: number;
  y: number;
  radius: number;
  direction: "up" | "down" | "left" | "right" | null;
  transitioning?: boolean;
}

export default function Player({ x, y, radius, direction, transitioning }: PlayerProps) {
  const rotation =
    direction === "up"
      ? "-90deg"
      : direction === "down"
      ? "90deg"
      : direction === "left"
      ? "180deg"
      : "0deg";

  return (
    <div
      className={`absolute transition-transform duration-75 ${
        transitioning ? "zone-warp" : ""
      }`}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: x - radius,
        top: y - radius,
        transform: `rotate(${rotation})`
      }}
    >
      {/* Thruster (NEW) */}
      <Thruster x={x} y={y} direction={direction} />

      {/* Glow aura */}
      <div className="absolute inset-0 rounded-full bg-white/20 blur-xl" />

      {/* Astronaut sprite */}
      <Image
        src="/images/sprites/astronaut.png"
        alt="Astronaut"
        fill
        className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        priority
      />
    </div>
  );
}
