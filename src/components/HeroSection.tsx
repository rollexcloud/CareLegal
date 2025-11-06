import Image from "next/image";
import Link from "next/link";

const HERO_BG =
  "https://images.pexels.com/photos/5668432/pexels-photo-5668432.jpeg?auto=compress&cs=tinysrgb&w=1920&dpr=1";
const HERO_IMAGE =
  "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=960&dpr=1";
const heroStats = [
  { value: "450+", label: "Trusted Clients" },
  { value: "99%", label: "Success Rate" },
  { value: "750K", label: "Recovered For Clients" },
  { value: "445", label: "Trusted Partners" },
  { value: "65+", label: "Years Combined" },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0d] pb-36 pt-32 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0b0b11]/95 to-[#141620]/85" aria-hidden />
      <div className="relative mx-auto grid w/full max-w-[1140px] items-center gap-16 px-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-9">
          <span className="inline-flex items-center rounded-full border border-[#c7a24a]/60 bg-[#c7a24a]/15 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.45em] text-[#e8c66d]">
            Welcome to Law Firm
          </span>
          <h1 className="text-balance text-[36px] font-semibold leading-[1.1] text-white sm:text-[48px] md:text-[58px]">
            We Are A Global Force In Legal Defense
          </h1>
          <p className="max-w-2xl text-[15px] leading-[1.9] text-white/70">
            Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-[#c7a24a] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#1c170a] transition hover:bg-[#d8b86a]"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/#about"
              className="inline-flex items-center rounded-full border border-white/40 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/10"
            >
              About The Firm
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {heroStats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-[12px] border border-white/15 bg-white/5 px-6 py-6 text-left shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
              >
                <span className="text-[32px] font-semibold text-[#e5c777]">{value}</span>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex w/full justify-end">
          <div className="relative w/full max-w-[460px] overflow-hidden rounded-[18px] border border-[#2c261b] shadow-[0_35px_60px_rgba(0,0,0,0.55)] md:-mb-28">
            <Image
              src={HERO_IMAGE}
              alt="Law firm hero"
              width={760}
              height={900}
              className="h-full w/full object-cover"
              priority
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-[#0a0a0d] to-[#f6f1e6]" aria-hidden />
    </section>
  );
}

export default HeroSection;
