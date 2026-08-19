import PageTransition from "./components/PageTransition";
import HomeContent from "./components/HomeContent";

export const metadata = {
  title: "SolarFlare",
  description: "A cosmic learning adventure built just for you."
};

export default function HomePage() {
  return (
    <PageTransition>
      <HomeContent />
    </PageTransition>
  );
}
