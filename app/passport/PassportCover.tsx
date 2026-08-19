"use client";

import { motion } from "framer-motion";

export default function PassportCover({ onOpen }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gradient-to-br from-purple-700 to-indigo-900 
                 rounded-3xl p-10 shadow-2xl text-center cursor-pointer"
      onClick={onOpen}
    >
      <h1 className="text-4xl font-bold mb-4">Cosmic Passport</h1>
      <p className="text-lg opacity-80">Tap to begin your journey</p>
    </motion.div>
  );
}
