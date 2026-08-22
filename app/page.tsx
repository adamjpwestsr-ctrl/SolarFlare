"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Full-page astronaut background */}
      <img
        src="/images/astronaut-holo.png"
        alt="Astronaut holding holographic signs"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Gradient overlay (non-blocking) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none z-10" />

      {/* Clickable holographic panels */}
      <Link
        href="/about"
        aria-label="About SolarFlare"
        className="
          absolute 
          z-20 
          left-[28%] 
          top-[46%] 
          w-[18%] 
          h-[10%]
          rounded-xl 
          hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]
          transition-shadow
          cursor-pointer
        "
      />

      <Link
        href="/home"
        aria-label="Enter SolarFlare"
        className="
          absolute 
          z-20 
          left-[54%] 
          top-[46%] 
          w-[18%] 
          h-[10%]
          rounded-xl 
          hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]
          transition-shadow
          cursor-pointer
        "
      />

      {/* Optional fade-in animation for the whole scene */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-30"
      />
    </main>
  );
}
