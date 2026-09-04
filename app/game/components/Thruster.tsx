"use client";

interface ThrusterProps {
  x: number;
  y: number;
  direction: "up" | "down" | "left" | "right" | null;
}

export default function Thruster({ x, y, direction }: ThrusterProps) {
  if (!direction) return null;

  const offset = 10;

  const pos =
    direction === "up"
      ? { left: x - 8, top: y + offset }
      : direction === "down"
      ? { left: x - 8, top: y - offset - 20 }
      : direction === "left"
      ? { left: x + offset, top: y - 8 }
      : { left: x - offset - 20, top: y - 8 };

  return (
    <>
      {/* Blue core flame */}
      <div
        className="thruster-base thruster-blue thruster-flame"
        style={{
          width: 16,
          height: 16,
          position: "absolute",
          ...pos
        }}
      />

      {/* White outer glow */}
      <div
        className="thruster-base thruster-white"
        style={{
          width: 28,
          height: 28,
          position: "absolute",
          ...pos
        }}
      />
    </>
  );
}
