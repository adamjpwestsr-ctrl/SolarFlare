"use client";

import { motion } from "framer-motion";

interface Props {
  facts: string[];
}

export default function FactList({ facts }: Props) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {facts.map((fact, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900 rounded-2xl p-4 shadow-md"
        >
          <p className="text-sm">{fact}</p>
        </motion.div>
      ))}
    </div>
  );
}
