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

const moreAreas = [
  "Insurance & Reinsurance Litigation",
  "Employment Litigation & Counseling",
  "Media & Entertainment Litigation",
];

function PracticeAreasSection() {
  return (
    <section id="practice-areas" className="bg-white pb-28 pt-24">
      <div className="mx-auto grid w/full max-w-[1140px] gap-16 px-4 sm:px-6 md:grid-cols-[0.95fr_1.1fr] md:items-start">
        <div className="space-y-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#b4975a]">Practice Areas</p>
          <h2 className="text-[36px] font-semibold leading-tight text-[#1c170a] sm:text-[44px]">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </h2>
          <p className="text-[16px] leading-[1.9] text-[#5c5541]">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <div className="mt-10 max-w-sm border-l-4 border-[#d8b86a] pl-6 text-[15px] leading-[1.9] text-[#5c5541]">
            &ldquo;Our experience spans corporate advisory, complex litigation, and regulatory support for global enterprises.&rdquo;
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

      <div className="mx-auto mt-14 w/full max-w-[1140px] px-4 sm:px-6">
        <div className="flex flex-col gap-8 bg-[#c7a24a] px-8 py-10 text-[#1c170a] shadow-[0_20px_45px_rgba(0,0,0,0.18)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em]">More Practice Areas</p>
            <p className="mt-3 text-[18px] font-semibold">Tailored support across emerging industries and jurisdictions.</p>
          </div>
          <ul className="grid gap-2 text-[14px] font-medium sm:grid-cols-3 sm:gap-6">
            {moreAreas.map((area) => (
              <li key={area} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#1c170a]" aria-hidden />
                {area}
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="inline-flex items-center justify-center border border-[#1c170a] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] transition hover:bg-[#1c170a] hover:text-white"
          >
            View All Areas
          </a>
        </div>
      </div>
    </section>
  );
}

export default PracticeAreasSection;
