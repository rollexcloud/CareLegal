
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";


export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <About />
      <Footer />
    </main>
  );
}
