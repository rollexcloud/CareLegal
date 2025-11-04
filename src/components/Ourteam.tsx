
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import teamMembers from "@/data/team-members.json";
import { TeamMember } from "@/types/team";

const testimonials: TeamMember[] = teamMembers satisfies TeamMember[];

export function Ourteam() {
  return (
    <div className="mt-40 overflow-hidden">
      <AnimatedTestimonials
        testimonials={testimonials.map(({ name, designation, quote, image }) => ({
          name,
          designation,
          quote,
          src: image,
        }))}
        autoplay
      />
    </div>
  );
}

export default Ourteam;
