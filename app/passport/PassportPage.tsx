"use client";

import { motion } from "framer-motion";
import StampCard from "./StampCard";
import badges from "@/data/badges.json";

export default function PassportPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Stamps</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {badges.badges.map((badge) => (
          <StampCard
            key={badge.id}
            badge={badge}
            onUnlock={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
