"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

      {/* Cosmic Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-900/40 to-black opacity-70" />

      {/* Astronaut + clickable signage */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative flex flex-col items-center text-center px-6 z-10"
      >
        <div className="relative inline-block">
          <img
            src="/images/astronaut-holo.png"
            alt="Astronaut holding holographic signs"
            className="w-72 h-auto drop-shadow-[0_0_35px_rgba(0,200,255,0.5)]"
          />

          {/* Clickable holographic panels over the signs */}
          <Link
            href="/about"
            aria-label="About SolarFlare"
            className="absolute left-[6%] top-[55%] w-[40%] h-[18%]
                       rounded-xl hover:shadow-[0_0_20px_rgba(0,255,255,0.7)]
                       transition-shadow duration-300 cursor-pointer"
          />
          <Link
            href="/home"
            aria-label="Enter SolarFlare"
            className="absolute right-[6%] top-[55%] w-[40%] h-[18%]
                       rounded-xl hover:shadow-[0_0_20px_rgba(0,255,255,0.7)]
                       transition-shadow duration-300 cursor-pointer"
          />
        </div>
      </motion.div>
    </main>
  );
}
