"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Starfield from "./Starfield";
import Planet from "./Planet";
import SolarFlareLogo from "./SolarFlareLogo";

export default function HomeContent() {
  return (
    <main className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">

      {/* Starfield Canvas */}
      <Starfield />

      {/* Rotating 3D Planet */}
      <Planet />

      {/* Animated Nebula Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-purple-900 to-black animate-pulse" />
      <div className="absolute inset-0 -z-10 opacity-40 bg-[url('/stars.png')] bg-cover bg-center animate-[twinkle_6s_ease-in-out_infinite]" />

      {/* Floating Glow Planets */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-24 right-16 w-48 h-48 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full blur-xl shadow-[0_0_60px_rgba(255,165,0,0.5)]"
      />

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-20 left-16 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full blur-xl opacity-70 shadow-[0_0_50px_rgba(0,0,255,0.4)]"
      />

      {/* Glowing SolarFlare Logo */}
      <SolarFlareLogo />

      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-6xl sm:text-7xl font-extrabold mb-6 text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
      >
        Welcome to <span className="text-orange-400 animate-pulse">SolarFlare</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed"
      >
        Prepare for launch, explorer. Your{" "}
        <span className="text-orange-300 font-semibold">Cosmic Passport</span>{" "}
        awaits — filled with badges, discoveries, and adventures across the stars.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 mb-16"
      >
        <Link
          href="/identity"
          className="relative bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:scale-110 hover:shadow-orange-400/50"
        >
          <span className="absolute inset-0 rounded-xl bg-orange-400 opacity-0 hover:opacity-20 blur-md transition-opacity" />
          Begin Your Journey 🚀
        </Link>

        <Link
          href="/daily"
          className="relative bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:scale-110 hover:shadow-purple-400/50"
        >
          <span className="absolute inset-0 rounded-xl bg-purple-400 opacity-0 hover:opacity-20 blur-md transition-opacity" />
          Daily Discovery ✨
        </Link>

        <Link
          href="/quiz"
          className="relative bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:scale-110 hover:shadow-blue-400/50"
        >
          <span className="absolute inset-0 rounded-xl bg-blue-400 opacity-0 hover:opacity-20 blur-md transition-opacity" />
          Quiz Hub 🧠
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
          className="w-20 h-20 bg-orange-400 rounded-full shadow-[0_0_40px_rgba(255,165,0,0.5)]"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="w-20 h-20 bg-purple-500 rounded-full shadow-[0_0_40px_rgba(128,0,128,0.5)]"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.6 }}
          className="w-20 h-20 bg-blue-500 rounded-full shadow-[0_0_40px_rgba(0,0,255,0.5)]"
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
