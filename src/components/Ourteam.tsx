import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { TeamMember } from "@/types/team";

type OurteamProps = {
  members: TeamMember[];
};

export function Ourteam({ members }: OurteamProps) {
  if (!members.length) {
    return null;
  }

  return (
    <div className="mt-40 overflow-hidden">
      <AnimatedTestimonials
        testimonials={members.map(({ name, designation, quote, image }) => ({
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
