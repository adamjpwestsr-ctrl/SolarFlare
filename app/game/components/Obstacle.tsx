"use client";

import { hazardStyles } from "../lib/hazardStyles";

interface ObstacleProps {
  x: number;
  y: number;
  radius: number;
  type: string;
}

export default function Obstacle({ x, y, radius, type }: ObstacleProps) {
  // Pull zone-specific class set, fallback to asteroid style
  const classes = hazardStyles[type] ?? "hazard-asteroid obstacle-drift";

  return (
    <div
      className={`absolute rounded-full ${classes}`}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: x - radius,
        top: y - radius
      }}
    />
  );
}
