"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CosmicIDCard({ explorer }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-indigo-900 p-10 rounded-3xl shadow-2xl text-center mt-10"
    >
      <div className="text-6xl mb-4">🚀</div>

      <h2 className="text-3xl font-bold mb-2">Cosmic ID Card</h2>

      <p className="text-xl mb-4">{explorer.name}</p>

      <p className="opacity-70 text-sm mb-6">Explorer ID: {explorer.id}</p>

      <button
        onClick={() => router.push("/passport")}
        className="bg-green-600 hover:bg-green-500 p-4 rounded-xl text-xl"
      >
        Begin Your Journey
      </button>
    </motion.div>
  );
}
