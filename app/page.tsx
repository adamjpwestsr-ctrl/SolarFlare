"use client";

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

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none z-10" />

      {/* Clickable bottom-half quadrants */}
      <div className="absolute inset-0 z-20 flex flex-col">
        {/* Top half (non-clickable) */}
        <div className="flex-1 pointer-events-none" />

        {/* Bottom half split into two clickable quarters */}
        <div className="flex flex-row h-1/2">
          {/* Left quarter → About SolarFlare */}
          <Link
            href="/about"
            aria-label="About SolarFlare"
            className="flex-1 hover:bg-cyan-400/10 transition-colors duration-300 cursor-pointer"
          />

          {/* Right quarter → Enter SolarFlare */}
          <Link
            href="/home"
            aria-label="Enter SolarFlare"
            className="flex-1 hover:bg-cyan-400/10 transition-colors duration-300 cursor-pointer"
          />
        </div>
      </div>
    </main>
  );
}
