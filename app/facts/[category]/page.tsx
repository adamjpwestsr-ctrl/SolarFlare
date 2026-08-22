"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import factsData from "@/data/facts.json";

export default function Page({ params }) {
  const category = decodeURIComponent(params.category);

  const categoryData = factsData.facts.find(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  if (!categoryData) {
    return (
      <div className="p-10 text-center text-white bg-black min-h-screen">
        <h1 className="text-3xl font-bold theme-text">Facts: {category}</h1>
        <p className="opacity-70 mt-4">No facts found for this category.</p>

        <Link
          href="/facts"
          className="block text-center mt-10 text-indigo-400 hover:text-indigo-300 transition"
        >
          ← Back to Facts Explorer
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-screen bg-black text-white p-10 relative"
    >
      {/* 🌌 Pillars of Creation Background */}
      <div
        className="pillars-bg fixed inset-0 -z-50 bg-cover bg-center opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: "url('/images/pillars-of-creation.jpg')"
        }}
      />

      {/* Cosmic title animation */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl font-bold theme-text mb-6 text-center"
      >
        Facts: {categoryData.category}
      </motion.h1>

      {/* Animated facts list */}
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08 }
          }
        }}
        className="max-w-3xl mx-auto space-y-4 text-lg"
      >
        {categoryData.facts.map((fact, index) => (
          <motion.li
            key={index}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/20 transition"
          >
            {fact}
          </motion.li>
        ))}
      </motion.ul>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center mt-10"
      >
        <Link
          href="/facts"
          className="inline-block text-indigo-400 hover:text-indigo-300 text-lg font-medium transition relative"
        >
          <span className="absolute inset-0 blur-lg bg-indigo-500/20 rounded-full animate-pulse" />
          <span className="relative">← Back to Facts Explorer</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
