"use client";

interface PauseMenuProps {
  onResume: () => void;
  onQuit: () => void;
}

export default function PauseMenu({ onResume, onQuit }: PauseMenuProps) {
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-lg flex flex-col items-center justify-center text-white z-50">
      <h2 className="text-4xl font-bold mb-6">Paused</h2>

      <button
        onClick={onResume}
        className="mb-4 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 text-xl transition"
      >
        Resume
      </button>

      <button
        onClick={onQuit}
        className="px-6 py-3 bg-red-600/80 hover:bg-red-600 rounded-xl text-xl transition"
      >
        Quit Game
      </button>
    </div>
  );
}
