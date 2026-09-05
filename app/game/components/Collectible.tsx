"use client";

import { collectibleStyles } from "../lib/collectibleStyles";
import { rarityStyles } from "../lib/rarityStyles";

interface CollectibleProps {
  id: string;
  x: number;
  y: number;
  radius: number;
  name: string;      // ← REQUIRED
  points: number;    // ← REQUIRED
  rarity: string;
}

export default function Collectible({
  id,
  x,
  y,
  radius,
  name,
  points,
  rarity
}: CollectibleProps) {
  const baseClass =
    collectibleStyles[id] ?? "collectible-moon-rock collectible-sparkle";
  const rarityClass = rarityStyles[rarity] ?? "rarity-common";

  return (
    <div
      className={`absolute rounded-full ${baseClass} ${rarityClass}`}
      style={{
        width: radius * 2,
        height: radius * 2,
        left: x - radius,
        top: y - radius
      }}
      data-name={name}      // optional metadata
      data-points={points}  // optional metadata
    />
  );
}
