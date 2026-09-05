"use client";

interface GameHUDProps {
  score: number;
  zoneName: string;
  player: { x: number; y: number; radius: number };
  obstacles: { x: number; y: number; radius: number }[];
  collectibles: { x: number; y: number; radius: number }[];
  onPause: () => void;
}

export default function GameHUD({
  score,
  zoneName,
  player,
  obstacles,
  collectibles,
  onPause
}: GameHUDProps) {
  const MAP_WIDTH = 150;
  const MAP_HEIGHT = 100;
  const SCALE_X = MAP_WIDTH / 900;
  const SCALE_Y = MAP_HEIGHT / 600;

  return (
    <div className="absolute top-0 left-0 w-full px-4 py-3 bg-black/40 backdrop-blur-md text-white flex justify-between items-center z-50 border-b border-white/10">
      <div className="text-lg font-semibold">{zoneName}</div>

      <div className="text-lg font-bold">
        Score: <span className="text-yellow-300">{score}</span>
      </div>

      {/* Mini-map */}
      <div
        className="relative bg-black/60 border border-white/20 rounded-md mr-4"
        style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
      >
        {/* Player */}
        <div
          className="absolute bg-blue-400 rounded-full"
          style={{
            width: 6,
            height: 6,
            left: player.x * SCALE_X,
            top: player.y * SCALE_Y
          }}
        />

        {/* Obstacles */}
        {obstacles.map((o) => (
          <div
            key={o.id}
            className="absolute bg-red-500 rounded-full opacity-80"
            style={{
              width: 4,
              height: 4,
              left: o.x * SCALE_X,
              top: o.y * SCALE_Y
            }}
          />
        ))}

        {/* Collectibles */}
        {collectibles.map((c) => (
          <div
            key={c.id}
            className="absolute bg-yellow-300 rounded-full opacity-80"
            style={{
              width: 4,
              height: 4,
              left: c.x * SCALE_X,
              top: c.y * SCALE_Y
            }}
          />
        ))}
      </div>

      <button
        onClick={onPause}
        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition"
      >
        Pause
      </button>
    </div>
  );
}
