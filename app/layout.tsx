import "./globals.css";
import NavBar from "./components/NavBar";
import PageTransition from "./components/PageTransition";
import { headers } from "next/headers";

export default async function RootLayout({ children }) {
  // FIX: headers() must be awaited
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";

  const hideNav =
    pathname.startsWith("/identity") ||
    pathname.startsWith("/onboarding");

  // Load explorer theme from localStorage (client-side only)
  let themeClass = "";
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("solarflare_explorer");
    if (raw) {
      const explorer = JSON.parse(raw);
      themeClass = `theme-${explorer.theme}`;
    }
  }

  return (
    <html lang="en">
      <body className={`bg-black text-white min-h-screen ${themeClass}`}>
        <PageTransition>
          {children}
        </PageTransition>

        {!hideNav && <NavBar />}
      </body>
    </html>
  );
}
