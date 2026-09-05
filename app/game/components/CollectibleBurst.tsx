"use client";

interface BurstProps {
  x: number;
  y: number;
  rarity: string;
}

export default function CollectibleBurst({ x, y, rarity }: BurstProps) {
  const burstClass = `burst-${rarity || "common"}`;

  return (
    <>
      {/* Main expanding burst */}
      <div
        className={`burst-base ${burstClass} burst-expand`}
        style={{
          left: x - 20,
          top: y - 20,
          width: 40,
          height: 40
        }}
      />

      {/* Outer ring */}
      <div
        className={`burst-base ${burstClass} burst-ring`}
        style={{
          left: x - 30,
          top: y - 30,
          width: 60,
          height: 60
        }}
      />
    </>
  );
}
