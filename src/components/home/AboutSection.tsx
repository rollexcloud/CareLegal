import Image from "next/image";

const ABOUT_IMAGE =
  "https://images.pexels.com/photos/5668776/pexels-photo-5668776.jpeg?auto=compress&cs=tinysrgb&w=920&dpr=1";

const signatureLines = [
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
];

function AboutSection() {
  return (
    <section id="about" className="relative bg-[#f6f1e6] pb-28 pt-36">
      <div className="mx-auto grid w/full max-w-[1140px] gap-16 px-4 sm:px-6 md:grid-cols-[1.05fr_1.05fr] md:items-center">
        <div className="space-y-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#b4975a]">About The Firm</p>
          <h2 className="text-[36px] font-semibold leading-tight text-[#1c170a] sm:text-[44px]">
            We are a full-service law firm delivering strategic advocacy worldwide.
          </h2>
          <div className="space-y-5 text-[16px] leading-[1.9] text-[#544d3a]">
            {signatureLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="pt-6">
            <p className="text-[14px] font-semibold uppercase tracking-[0.35em] text-[#b4975a]">Simon Bell</p>
            <p className="mt-1 text-[13px] font-medium text-[#6f684f]">Founder & Managing Partner</p>
          </div>
        </div>

        <div className="relative">
          <div className="relative ml-auto max-w-[520px] border border-white bg-white p-6 shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
            <div className="relative -mt-24 h-[360px] overflow-hidden border border-[#dcd3c1]">
              <Image
                src={ABOUT_IMAGE}
                alt="About law firm"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-6 border-t border-[#ede4d1] pt-8 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-[18px] font-semibold text-[#1c170a]">Unmatched Strategy</h3>
                <p className="text-[14px] leading-[1.8] text-[#5c5541]">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-[18px] font-semibold text-[#1c170a]">Trusted Expertise</h3>
                <p className="text-[14px] leading-[1.8] text-[#5c5541]">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
              <div className="space-y-3 md:col-span-2">
                <h3 className="text-[18px] font-semibold text-[#1c170a]">Client Commitment</h3>
                <p className="text-[14px] leading-[1.8] text-[#5c5541]">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
