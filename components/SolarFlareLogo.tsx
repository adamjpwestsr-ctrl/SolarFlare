"use client";

import { motion } from "framer-motion";

export default function SolarFlareLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="mb-8 flex items-center justify-center"
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 20px rgba(255,165,0,0.4)",
            "0 0 40px rgba(255,165,0,0.6)",
            "0 0 20px rgba(255,165,0,0.4)"
          ]
        }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center"
      >
        <motion.span
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="text-4xl font-extrabold text-white drop-shadow-lg"
        >
          ☀️
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
