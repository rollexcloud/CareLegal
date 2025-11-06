import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import PracticeAreasSection from "@/components/home/PracticeAreasSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AttorneysSection from "@/components/home/AttorneysSection";
import CtaSection from "@/components/home/CtaSection";
import ContactInfoSection from "@/components/home/ContactInfoSection";
import FooterSection from "@/components/home/FooterSection";
import BackToTopButton from "@/components/home/BackToTopButton";
import { readTeamMembers } from "@/lib/team-data";

async function HomePage() {
  const teamMembers = await readTeamMembers();

  return (
    <main className="min-h-screen bg-background">
      <section id="hero">
        <HeroSection />
      </section>

      <AboutSection />
      <PracticeAreasSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <AttorneysSection members={teamMembers} />
      <CtaSection />
      <ContactInfoSection />

      <FooterSection />
      <BackToTopButton />
    </main>
  );
}

export default HomePage;
