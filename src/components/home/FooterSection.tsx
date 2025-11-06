const footerLinks = [
  {
    title: "Quick Links",
    items: ["Home", "About", "Practice Areas", "Attorneys", "Contact"],
  },
  {
    title: "Practice Areas",
    items: ["Antitrust & Competition", "Class Action Litigation", "Insurance Recovery", "Transnational Litigation"],
  },
  {
    title: "Resources",
    items: ["Case Studies", "Insights", "FAQs", "Support"],
  },
];

function FooterSection() {
  return (
    <section className="bg-[#07070a] py-24 text-white">
      <div className="mx-auto grid w-full max-w-[1140px] gap-16 px-4 sm:px-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#e5c777]">Care Legal</p>
          <h2 className="text-[32px] font-semibold leading-[1.4]">
            We are ready to fight for your rights.
          </h2>
          <p className="max-w-xl text-[14px] leading-[1.9] text-white/70">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {footerLinks.map(({ title, items }) => (
            <div key={title} className="space-y-4">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e5c777]">{title}</h3>
              <ul className="space-y-2 text-[13px] text-white/70">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-16 flex w-full max-w-[1140px] flex-col gap-4 border-t border-white/10 px-4 pt-8 text-[11px] uppercase tracking-[0.3em] text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <span>Copyright 2025 Care Legal</span>
        {/* <span>Powered By Care Legal</span> */}
      </div>
    </section>
  );
}

export default FooterSection;
