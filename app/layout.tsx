import "./globals.css";
import NavBar from "@/components/NavBar";
import PageTransition from "@/components/PageTransition";
import HomeContent from "@/components/HomeContent";

export default function RootLayout({ children }) {

  // Server-side only — DO NOT use localStorage or window here
  // DO NOT await headers() — layouts must be synchronous

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {/* Page transitions + content */}
        <PageTransition>
          {children}
        </PageTransition>

        {/* Global navigation */}
        <NavBar />
      </body>
    </html>
  );
}
