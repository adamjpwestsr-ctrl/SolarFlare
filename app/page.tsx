"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

      {/* Cosmic Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-900/40 to-black opacity-70" />

      {/* Astronaut */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center text-center px-6"
      >
        <img
          src="/images/astronaut-holo.png"
          alt="Astronaut"
          className="w-72 h-auto mb-10 drop-shadow-[0_0_35px_rgba(0,200,255,0.5)]"
        />

        {/* Floating Holographic Panels */}
        <div className="flex flex-col gap-6">
          <Link
            href="/about"
            className="px-8 py-4 rounded-xl text-xl font-bold shadow-lg
                       bg-indigo-600/80 hover:bg-indigo-500/80
                       backdrop-blur-xl border border-indigo-300/30"
          >
            ABOUT SOLARFLARE
          </Link>

          <Link
            href="/home"
            className="px-8 py-4 rounded-xl text-xl font-bold shadow-lg
                       bg-orange-500/80 hover:bg-orange-400/80
                       backdrop-blur-xl border border-orange-300/30"
          >
            ENTER SOLARFLARE
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
