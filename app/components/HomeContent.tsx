"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Starfield from "./Starfield";
import Planet from "./Planet";
import SolarFlareLogo from "./SolarFlareLogo";

export default function HomeContent() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-black text-gray-200 overflow-hidden">

      {/* Starfield Canvas — fades to subtle background */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3.5, duration: 1.5, ease: "easeOut" }}
        className="fixed inset-0 -z-30"
      >
        <Starfield />
      </motion.div>

      {/* Rotating 3D Planet */}
      <div className="absolute top-32 right-20 w-[220px] h-[220px]">
        <Planet />
      </div>

      {/* Cosmic Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_transparent_70%)] pointer-events-none" />

      {/* Floating Glow Planets */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-24 right-16 w-40 h-40 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full blur-xl shadow-[0_0_40px_rgba(255,165,0,0.4)]"
      />

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-24 left-16 w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full blur-xl opacity-70 shadow-[0_0_40px_rgba(0,0,255,0.4)]"
      />

      {/* Glowing SolarFlare Logo — resized */}
      <div className="w-[180px] h-[180px] mb-6">
        <SolarFlareLogo />
      </div>

      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-5xl sm:text-6xl font-extrabold mb-6 text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
      >
        Welcome to <span className="text-orange-400 animate-pulse">SolarFlare</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="text-lg text-gray-300 max-w-2xl mb-12 leading-relaxed"
      >
        Prepare for launch, explorer. Your{" "}
        <span className="text-orange-300 font-semibold">Cosmic Passport</span>{" "}
        awaits — filled with badges, discoveries, and adventures across the stars.
      </motion.p>

      {/* CTA Tiles */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
      >
        <Link
          href="/identity"
          className="bg-gradient-to-br from-orange-500 to-yellow-500 text-black font-bold text-xl px-8 py-10 rounded-2xl shadow-[0_0_25px_rgba(255,165,0,0.6)] hover:scale-105 transition-transform hover:shadow-[0_0_35px_rgba(255,165,0,0.8)]"
        >
          🚀 Begin Your Journey
        </Link>

        <Link
          href="/daily"
          className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold text-xl px-8 py-10 rounded-2xl shadow-[0_0_25px_rgba(128,0,128,0.6)] hover:scale-105 transition-transform hover:shadow-[0_0_35px_rgba(128,0,128,0.8)]"
        >
          ✨ Daily Discovery
        </Link>

        <Link
          href="/quiz"
          className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold text-xl px-8 py-10 rounded-2xl shadow-[0_0_25px_rgba(0,0,255,0.6)] hover:scale-105 transition-transform hover:shadow-[0_0_35px_rgba(0,0,255,0.8)]"
        >
          🧠 Quiz Hub
        </Link>
      </motion.div>

      {/* Animated Badge Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="flex gap-6 mt-4 opacity-90"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-16 h-16 bg-orange-400 rounded-full shadow-[0_0_30px_rgba(255,165,0,0.5)]"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="w-16 h-16 bg-purple-500 rounded-full shadow-[0_0_30px_rgba(128,0,128,0.5)]"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.6 }}
          className="w-16 h-16 bg-blue-500 rounded-full shadow-[0_0_30px_rgba(0,0,255,0.5)]"
        />
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="mt-16 text-gray-400 text-sm animate-pulse"
      >
        Built with love for a young explorer 🌠
      </motion.p>
    </main>
  );
}
