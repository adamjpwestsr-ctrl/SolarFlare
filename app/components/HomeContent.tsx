"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Starfield from "./Starfield";
import Planet from "./Planet";
import SolarFlareLogo from "./SolarFlareLogo";

export default function HomeContent() {
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSoundRef.current = new Audio("/sounds/hover-whoosh.mp3");
    hoverSoundRef.current.volume = 0.4;
  }, []);

  const playHoverSound = () => {
    if (!hoverSoundRef.current) return;
    // For iPad/app, this will trigger on tap as well
    hoverSoundRef.current.currentTime = 0;
    hoverSoundRef.current.play().catch(() => {});
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-black text-gray-200 overflow-hidden">

      {/* Nebula Background Layer */}
      <div className="absolute inset-0 -z-40 bg-gradient-to-b from-black via-slate-900 to-black" />
      <div className="absolute inset-0 -z-35 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(88,28,135,0.6),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(37,99,235,0.5),_transparent_60%)]" />

      {/* Starfield Canvas — intro fade to subtle background */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.25 }}
        transition={{ delay: 3, duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 -z-30"
      >
        <Starfield />
      </motion.div>

      {/* Rotating 3D Planet */}
      <div className="absolute top-24 right-16 w-[220px] h-[220px]">
        <Planet />
      </div>

      {/* Floating Glow Planets */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full blur-xl shadow-[0_0_40px_rgba(255,165,0,0.4)]"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-24 left-10 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full blur-xl opacity-70 shadow-[0_0_40px_rgba(0,0,255,0.4)]"
      />

      {/* Glowing SolarFlare Logo — resized */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-[160px] h-[160px] mb-4"
      >
        <SolarFlareLogo />
      </motion.div>

      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-extrabold mb-4 text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
      >
        Welcome, <span className="text-orange-400">Young Explorer</span> 🌟
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="text-base sm:text-lg text-gray-300 max-w-2xl mb-10 leading-relaxed"
      >
        Tap a mission tile to explore space, earn{" "}
        <span className="text-orange-300 font-semibold">Cosmic Badges</span>, and
        unlock new discoveries across the galaxy.
      </motion.p>

      {/* Mission Tiles (Interactive, Kid-Friendly) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14 w-full max-w-4xl"
      >
        <Link
          href="/identity"
          onMouseEnter={playHoverSound}
          onTouchStart={playHoverSound}
          className="group relative bg-gradient-to-br from-orange-500 to-yellow-500 text-black font-bold text-lg sm:text-xl p-6 sm:p-8 rounded-2xl shadow-[0_0_25px_rgba(255,165,0,0.6)] hover:scale-105 transition-transform"
        >
          <div className="absolute inset-0 rounded-2xl bg-orange-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity" />
          <div className="flex flex-col items-start gap-2">
            <span className="text-2xl">🚀 Mission: Identity</span>
            <span className="text-sm sm:text-base text-gray-800">
              Create your space profile and choose your explorer name.
            </span>
          </div>
        </Link>

        <Link
          href="/daily"
          onMouseEnter={playHoverSound}
          onTouchStart={playHoverSound}
          className="group relative bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold text-lg sm:text-xl p-6 sm:p-8 rounded-2xl shadow-[0_0_25px_rgba(128,0,128,0.6)] hover:scale-105 transition-transform"
        >
          <div className="absolute inset-0 rounded-2xl bg-purple-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity" />
          <div className="flex flex-col items-start gap-2">
            <span className="text-2xl">✨ Mission: Daily Discovery</span>
            <span className="text-sm sm:text-base text-gray-200">
              Unlock a new space fact or mini‑challenge every day.
            </span>
          </div>
        </Link>

        <Link
          href="/quiz"
          onMouseEnter={playHoverSound}
          onTouchStart={playHoverSound}
          className="group relative bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold text-lg sm:text-xl p-6 sm:p-8 rounded-2xl shadow-[0_0_25px_rgba(0,0,255,0.6)] hover:scale-105 transition-transform"
        >
          <div className="absolute inset-0 rounded-2xl bg-blue-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity" />
          <div className="flex flex-col items-start gap-2">
            <span className="text-2xl">🧠 Mission: Quiz Hub</span>
            <span className="text-sm sm:text-base text-gray-200">
              Test your cosmic knowledge and level up your rank.
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Draggable Badges Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="flex gap-6 mt-2 opacity-95 justify-center"
      >
        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -20, bottom: 20 }}
          whileTap={{ scale: 1.1 }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-16 h-16 bg-orange-400 rounded-full shadow-[0_0_30px_rgba(255,165,0,0.7)] flex items-center justify-center cursor-pointer"
        >
          🪙
        </motion.div>

        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -20, bottom: 20 }}
          whileTap={{ scale: 1.1 }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 3.2 }}
          className="w-16 h-16 bg-purple-500 rounded-full shadow-[0_0_30px_rgba(128,0,128,0.7)] flex items-center justify-center cursor-pointer"
        >
          🌌
        </motion.div>

        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -20, bottom: 20 }}
          whileTap={{ scale: 1.1 }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3.4 }}
          className="w-16 h-16 bg-blue-500 rounded-full shadow-[0_0_30px_rgba(0,0,255,0.7)] flex items-center justify-center cursor-pointer"
        >
          ⭐
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="mt-10 text-gray-400 text-xs sm:text-sm animate-pulse"
      >
        Built with love for a young explorer 🌠
      </motion.p>
    </main>
  );
}
