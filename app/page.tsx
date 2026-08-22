"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">

      {/* Full-page astronaut background */}
      <img
        src="/images/astronaut-holo.png"
        alt="Astronaut holding holographic signs"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none z-10" />

      {/* Clickable holographic panels */}
      <Link
        href="/about"
        className="absolute left-[calc(50%-260px)] top-[42%] w-[220px] h-[100px]
                   z-20 rounded-xl hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]
                   transition-shadow duration-300"
        aria-label="About SolarFlare"
      />
      <Link
        href="/home"
        className="absolute left-[calc(50%+40px)] top-[42%] w-[220px] h-[100px]
                   z-20 rounded-xl hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]
                   transition-shadow duration-300"
        aria-label="Enter SolarFlare"
      />

      {/* Animated content overlay */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-30 flex flex-col items-center text-center px-6"
      >
        {/* Fallback buttons for mobile */}
        <div className="flex flex-col gap-6 mt-[600px]">
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
