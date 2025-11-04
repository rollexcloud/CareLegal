// app/our-team/page.tsx
import Instructors from "@/components/Ourteam";
import Footer from "@/components/Footer";

export default function OurTeamPage() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Instructors />
      <Footer />
    </main>
  );
}
