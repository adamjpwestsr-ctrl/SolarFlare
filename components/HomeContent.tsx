"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Starfield from "./Starfield";
import SolarFlareLogo from "./SolarFlareLogo";

export default function HomeContent() {
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSoundRef.current = new Audio("/sounds/hover-whoosh.mp3");
    hoverSoundRef.current.volume = 0.4;
  }, []);

  const playHoverSound = () => {
    if (!hoverSoundRef.current) return;
    hoverSoundRef.current.currentTime = 0;
    hoverSoundRef.current.play().catch(() => {});
  };

  return (
    <main className="relative min-h-screen text-gray-200 overflow-hidden pb-32">
      {/* 🌠 Starfield */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.25 }}
        transition={{ delay: 2.5, duration: 1.5, ease: "easeOut" }}
        className="fixed inset-0 -z-50 pointer-events-none"
      >
        <Starfield />
      </motion.div>

      {/* 🌌 Nebula Gradient */}
      <div className="fixed inset-0 -z-45 nebula-bg pointer-events-none" />

      {/* ✨ Constellation Overlay */}
      <div className="fixed inset-0 -z-40 opacity-40 bg-[url('/images/constellations.svg')] bg-cover bg-center pointer-events-none" />

      {/* ☀️ Glowing Sun */}
      <motion.div
        animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute inset-0 -z-30 bg-orange-500 blur-[180px] opacity-20 pointer-events-none"
      />

      {/* 🚀 HERO SECTION */}
      <section className="space-y-6 max-w-6xl mx-auto px-4 pt-16">
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-indigo-700/30 p-8 shadow-xl shadow-indigo-900/40 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-52 h-52 bg-sky-500/10 blur-3xl" />
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-indigo-400 mb-3">
            Welcome back
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold mb-3">
            Young Explorer, your next cosmic mission awaits.
          </h1>
          <p className="text-slate-300 max-w-2xl text-sm md:text-base">
            Discover facts, earn badges, and test your cosmic knowledge—all in one place.
          </p>
        </div>
      </section>

      {/* 🌍 MISSION TILES */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4 mt-12">
        <Link href="/daily" className="group block">
          <div
            onMouseEnter={playHoverSound}
            onTouchStart={playHoverSound}
            className="rounded-2xl border border-slate-800 bg-gradient-to-br from-purple-700/80 to-indigo-600/40 p-6 shadow-lg transition-all group-hover:shadow-cosmic group-hover:brightness-110 cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-white">✨ Daily Discovery</h3>
            <p className="text-sm text-gray-200 mt-2">Unlock a new fact each day.</p>
          </div>
        </Link>

        <Link href="/quiz" className="group block">
          <div
            onMouseEnter={playHoverSound}
            onTouchStart={playHoverSound}
            className="rounded-2xl border border-slate-800 bg-gradient-to-br from-blue-600/80 to-cyan-500/40 p-6 shadow-lg transition-all group-hover:shadow-cosmic group-hover:brightness-110 cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-white">🧠 Quiz Hub</h3>
            <p className="text-sm text-gray-200 mt-2">Test your cosmic knowledge.</p>
          </div>
        </Link>

        <Link href="/identity" className="group block">
          <div
            onMouseEnter={playHoverSound}
            onTouchStart={playHoverSound}
            className="rounded-2xl border border-slate-800 bg-gradient-to-br from-orange-500/80 to-yellow-500/40 p-6 shadow-lg transition-all group-hover:shadow-cosmic group-hover:brightness-110 cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-black">🚀 Identity</h3>
            <p className="text-sm text-gray-800 mt-2">Create your explorer profile.</p>
          </div>
        </Link>
      </section>

      {/* ========================= */}
      {/* 📊 DASHBOARD PLACEHOLDERS */}
      {/* ========================= */}
      <section className="w-full max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        <div className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl border border-white/30 shadow-lg shadow-inner">
          <h3 className="text-xl font-bold mb-2">🌠 Today’s Discovery</h3>
          <p className="text-sm text-gray-300">Placeholder: A cool space fact will appear here.</p>
        </div>
        <div className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl border border-white/30 shadow-lg shadow-inner">
          <h3 className="text-xl font-bold mb-2">🔥 Quiz Streak</h3>
          <p className="text-sm text-gray-300">Placeholder: Your streak count goes here.</p>
        </div>
        <div className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl border border-white/30 shadow-lg shadow-inner">
          <h3 className="text-xl font-bold mb-2">🚀 Explorer Level</h3>
          <p className="text-sm text-gray-300">Placeholder: Your XP progress will show here.</p>
        </div>
      </section>

      {/* ========================= */}
      {/* 🌍 FOOTER DOCK */}
      {/* ========================= */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 shadow-[0_-10px_30px_rgba(255,255,255,0.1)] flex justify-around py-3 text-sm text-gray-300">
        <Link href="/passport">🪪 Passport</Link>
        <Link href="/facts">📘 Facts</Link>
        <Link href="/quiz">🧠 Quizzes</Link>
        <Link href="/daily">✨ Daily</Link>
        <Link href="/explorers">🚀 Explorers</Link>
        <Link href="/settings">⚙️ Settings</Link>
        <Link href="/home">🏠 Home</Link>
      </footer>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="mt-10 text-gray-400 text-xs sm:text-sm text-center"
      >
        Built with love for a young explorer 🌠
      </motion.p>
    </main>
  );
}
