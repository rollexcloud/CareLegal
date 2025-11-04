// app/our-team/page.tsx
import { readTeamMembers } from "@/lib/team-data";
import Instructors from "@/components/Ourteam";
import Footer from "@/components/Footer";

export default async function OurTeamPage() {
  const teamMembers = await readTeamMembers();

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Instructors members={teamMembers} />
      <Footer />
    </main>
  );
}
