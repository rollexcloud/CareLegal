
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import UpcomingWebinars from "@/components/UpcomingWebinars";
import About from "@/components/About";


export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <About />
      <UpcomingWebinars />
      <Footer />
    </main>
  );
}
