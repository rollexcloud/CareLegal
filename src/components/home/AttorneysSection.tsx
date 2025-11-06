import Image from "next/image";
import { TeamMember } from "@/types/team";

type AttorneysSectionProps = {
  members: TeamMember[];
};

function AttorneysSection({ members }: AttorneysSectionProps) {
  return (
    <section id="attorneys" className="bg-white pb-28 pt-24">
      <div className="mx-auto flex w/full max-w-[1140px] flex-col gap-12 px-4 sm:px-6">
        <div className="space-y-4 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#b4975a]">Attorneys</p>
          <h2 className="text-[34px] font-semibold text-[#1c170a] sm:text-[44px]">
            Meet Our Expert Legal Team
          </h2>
        </div>

        {members.length ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {members.map(({ id, name, designation, image, quote }) => (
              <article
                key={id}
                className="border border-[#ede4d1] bg-[#fdfbf6] px-8 pb-10 pt-8 text-center shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="relative mb-7 h-[300px] w-full border border-[#e5dbca]">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(min-width: 1024px) 240px, 50vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[18px] font-semibold text-[#1c170a]">{name}</h3>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#6f684f]">{designation}</p>
                {quote ? (
                  <p className="mt-4 text-[13px] leading-[1.8] text-[#5c5541]">“{quote}”</p>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-[#ede4d1] bg-[#fdfbf6] px-12 py-12 text-center text-[14px] text-[#5c5541]">
            Team profiles will appear here soon.
          </div>
        )}
      </div>
    </section>
  );
}

export default AttorneysSection;
