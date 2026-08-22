"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10 pb-24">
      <h1 className="text-4xl font-bold theme-text mb-6 text-center">
        About SolarFlare
      </h1>

      <div className="max-w-3xl mx-auto bg-white/10 p-8 rounded-2xl border border-white/20">
        <p className="text-lg leading-relaxed opacity-90 mb-6">
          SolarFlare is an interactive cosmic learning adventure built for young explorers.
          Discover space facts, earn badges, take quizzes, and grow your cosmic knowledge
          through fun, engaging missions.
        </p>

        <p className="text-lg leading-relaxed opacity-90 mb-6">
          Designed with care, creativity, and a love for astronomy, SolarFlare helps kids
          learn through exploration — one star at a time.
        </p>

        <p className="text-lg leading-relaxed opacity-90 mb-6">
          Built by a dad for his son, SolarFlare is a cosmic playground where curiosity
          becomes discovery.
        </p>
      </div>

      <div className="text-center mt-10">
        <Link
          href="/home"
          className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl text-lg font-bold"
        >
          Enter SolarFlare
        </Link>
      </div>
    </main>
  );
}
