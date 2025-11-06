import Image from "next/image";

const practiceAreas = [
  {
    number: ".01",
    title: "Antitrust & Competition",
    summary: "Strategic advocacy through merger control, cartel defense, and market investigations.",
    highlights: ["Merger review filings", "Cartel investigations", "State aid compliance"],
  },
  {
    number: ".02",
    title: "Bankruptcy & Restructuring",
    summary: "Guiding boards and lenders through workouts, restructurings, and insolvency litigation.",
    highlights: ["Distressed M&A", "Chapter 11 counsel", "Cross-border restructurings"],
  },
  {
    number: ".03",
    title: "International Trade Litigation",
    summary: "Resolving customs, sanctions, and trade remedy disputes across key jurisdictions.",
    highlights: ["Tariff mitigation", "Export controls", "WTO & ITC proceedings"],
  },
  {
    number: ".04",
    title: "Class Action Litigation",
    summary: "Defending complex class actions with coordinated discovery and trial-ready strategies.",
    highlights: ["Securities claims", "Consumer protection", "Shareholder derivative suits"],
  },
  {
    number: ".05",
    title: "Insurance Recovery",
    summary: "Maximising policy recovery for business interruption, cyber, and D&O claims.",
    highlights: ["Coverage analysis", "Recovery strategy", "Arbitration & litigation"],
  },
  {
    number: ".06",
    title: "Transnational Litigation",
    summary: "Coordinating multi-jurisdictional disputes, enforcement actions, and asset recovery.",
    highlights: ["Foreign judgment enforcement", "Investment treaty claims", "Asset tracing"],
  },
];

const PRACTICE_IMAGE =
  "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=640&dpr=1";

const practiceStats = [
  { value: "40+", label: "Dedicated Litigators" },
  { value: "27", label: "Jurisdictions Covered" },
  { value: "95%", label: "Dispute Success Rate" },
];

function PracticeAreasSection() {
  return (
    <section id="practice-areas" className="bg-white pb-28 pt-24">
      <div className="mx-auto grid w/full max-w-[1140px] gap-16 px-4 sm:px-6 md:grid-cols-[0.95fr_1.1fr] md:items-start">
        <div className="space-y-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#b4975a]">Practice Areas</p>
          <h2 className="text-[36px] font-semibold leading-tight text-[#1c170a] sm:text-[44px]">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </h2>
          <p className="text-[16px] leading-[1.9] text-[#5c5541]">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <div className="relative h-64 w-full overflow-hidden border border-[#ede4d1] shadow-[0_18px_45px_rgba(0,0,0,0.12)] sm:h-72">
            <Image
              src={PRACTICE_IMAGE}
              alt="Litigation team discussing strategy"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/35 to-transparent" aria-hidden />
            <div className="absolute bottom-6 left-6 space-y-2 text-white">
              <span className="inline-flex items-center rounded-full border border-white/50 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em]">
                High-Stakes Counsel
              </span>
              <p className="max-w-sm text-[15px] leading-[1.8] text-white/80">
                Counsel crafted for multijurisdictional disputes, regulatory scrutiny, and transformational transactions.
              </p>
            </div>
          </div>
          <div className="mt-10 max-w-sm border-l-4 border-[#d8b86a] pl-6 text-[15px] leading-[1.9] text-[#5c5541]">
            &ldquo;Our experience spans corporate advisory, complex litigation, and regulatory support for global enterprises.&rdquo;
          </div>
          <div className="grid gap-6 pt-4 sm:grid-cols-3">
            {practiceStats.map(({ value, label }) => (
              <div key={label} className="border border-[#ede4d1] bg-[#fdfbf6] px-6 py-6 text-left shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <p className="text-[30px] font-semibold text-[#1c170a]">{value}</p>
                <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#b4975a]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {practiceAreas.map(({ number, title, summary, highlights }) => (
            <article
              key={number}
              className="flex flex-col gap-5 border border-[#ede4d1] bg-[#fdfbf6] px-8 py-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
            >
              <span className="inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#b4975a]">
                <span className="h-6 w-0.5 bg-[#d8b86a]" aria-hidden />
                {number}
              </span>
              <div className="space-y-3">
                <h3 className="text-[20px] font-semibold text-[#1c170a]">{title}</h3>
                <p className="text-[14px] leading-[1.8] text-[#5c5541]">{summary}</p>
                <ul className="space-y-2 text-[13px] leading-[1.8] text-[#6f684f]">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 bg-[#b4975a]" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}

export default PracticeAreasSection;
