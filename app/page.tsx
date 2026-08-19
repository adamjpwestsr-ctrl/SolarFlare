import PageTransition from "./components/PageTransition";
import Link from "next/link";

export const metadata = {
  title: "SolarFlare",
  description: "A cosmic learning adventure built just for you."
};

export default function HomePage() {
  return (
    <PageTransition>
      <main className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">

        {/* Cosmic Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-purple-900 to-black" />
        <div className="absolute inset-0 -z-10 opacity-40 bg-[url('/stars.png')] bg-cover bg-center" />

        {/* Floating Planet */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full blur-sm animate-pulse" />

        {/* Hero Title */}
        <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 text-white drop-shadow-lg">
          Welcome to <span className="text-orange-400">SolarFlare</span>
        </h1>

        {/* Subtext */}
        <p className="text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
          Blast off into a universe of fun facts, cosmic badges, daily discoveries,
          and your very own <span className="text-orange-300 font-semibold">Cosmic Passport</span>.
          This adventure was built just for you — explorer of the stars.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/identity"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:scale-105"
          >
            Begin Your Journey 🚀
          </Link>

          <Link
            href="/daily"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:scale-105"
          >
            Daily Discovery ✨
          </Link>

          <Link
            href="/quiz"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:scale-105"
          >
            Quiz Hub 🧠
          </Link>
        </div>

        {/* Badge Preview */}
        <div className="flex gap-6 mt-4 opacity-90">
          <div className="w-20 h-20 bg-orange-400 rounded-full shadow-xl animate-bounce" />
          <div className="w-20 h-20 bg-purple-500 rounded-full shadow-xl animate-bounce delay-150" />
          <div className="w-20 h-20 bg-blue-500 rounded-full shadow-xl animate-bounce delay-300" />
        </div>

        {/* Footer */}
        <p className="mt-16 text-gray-500 text-sm">
          Built with love for a young explorer 🌠
        </p>
      </main>
    </PageTransition>
  );
}
