"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function NavBar() {
  const pathname = usePathname();

  const links = [
    { href: "/passport", label: "Passport", icon: "🪪" },
    { href: "/facts", label: "Facts", icon: "📚" },
    { href: "/quiz", label: "Quizzes", icon: "🧠" },
    { href: "/daily", label: "Daily", icon: "✨" },
    { href: "/explorers", label: "Explorers", icon: "👨‍🚀" },
    { href: "/explorers/settings", label: "Settings", icon: "⚙️" }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-black/70 backdrop-blur-xl 
                 border-t border-white/10 p-4 flex justify-around z-50"
    >
      {links.map((link) => {
        const active = pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center 
              text-sm md:text-lg lg:text-xl transition 
              ${active ? "theme-text" : "text-white/70"}`}
          >
            <motion.span
              whileTap={{ scale: 0.85 }}
              className="text-2xl md:text-4xl"
            >
              {link.icon}
            </motion.span>
            <span className="mt-1">{link.label}</span>
          </Link>
        );
      })}
    </motion.nav>
  );
}
