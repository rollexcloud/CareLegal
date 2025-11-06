"use client";

import { useState } from "react";

const featureCards = [
  {
    eyebrow: "Litigation Mastery",
    title: "Seasoned Trial Lawyers",
    copy: "Partner-led representation across complex commercial disputes, arbitrations, and regulatory defence.",
    points: ["Lead counsel in high-stakes cross-border cases", "Proven track record before tribunals and courts"],
  },
  {
    eyebrow: "Holistic Counsel",
    title: "Integrated Advisory + Litigation",
    copy: "Our attorneys collaborate across practice areas to anticipate risk and protect your commercial objectives.",
    points: ["Coordinated corporate and disputes teams", "Rapid response playbooks for urgent matters"],
  },
  {
    eyebrow: "Client Alignment",
    title: "Transparent Client Experience",
    copy: "Expect clear milestones, proactive updates, and strategies tailored to board-level stakeholders.",
    points: ["Direct partner access throughout engagement", "Strategic insights translated into action"],
  },
];

function WhyChooseSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="why-choose" className="relative overflow-hidden bg-[#151012] pb-28 pt-28 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/5668432/pexels-photo-5668432.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/92 via-[#1c1311]/90 to-[#2b1f19]/88" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-[1140px] gap-16 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-10">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-[#e5c777]/40 bg-[#e5c777]/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#e5c777]">
              Why Choose Us
            </span>
            <h2 className="text-[36px] font-semibold leading-tight text-white sm:text-[44px]">
              Strategic litigators with a playbook for every decisive moment.
            </h2>
            <p className="text-[16px] leading-[1.9] text-white/70">
              From urgent injunctions to board-level investigations, our litigators combine courtroom mastery with commercial pragmatism.
              We mobilise specialised teams, anticipate counter-moves, and communicate in boardroom-ready language.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-7 text-white shadow-[0_24px_65px_rgba(0,0,0,0.45)] backdrop-blur">
            <p className="text-[14px] leading-[1.9] text-white/75">
              Every mandate begins with a diagnostic war-room that brings together disputes, corporate, and regulatory specialists. We
              chart contingencies, align stakeholders, and keep CXOs informed with concise, decision-ready updates at each milestone.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            {featureCards.map(({ eyebrow, title, copy, points }, index) => {
              const isOpen = activeFeature === index;
              return (
                <div
                  key={title}
                  className="overflow-hidden rounded-[26px] border border-[#4b3523] bg-gradient-to-br from-[#c7a24a] via-[#c79f3f] to-[#b98b29] text-left text-[#1c170a] shadow-[0_32px_70px_rgba(0,0,0,0.45)] transition duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFeature((prev) => (prev === index ? -1 : index))}
                    aria-expanded={isOpen}
                    className="relative flex w-full items-center justify-between gap-6 px-9 py-8"
                  >
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#4b3523]/80">{eyebrow}</p>
                      <h3 className="mt-3 text-[20px] font-semibold leading-tight">{title}</h3>
                    </div>
                    <span
                      className={`inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#1c170a]/30 text-[18px] transition-transform ${
                        isOpen ? "rotate-90 border-[#1c170a]" : ""
                      }`}
                      aria-hidden
                    >
                      ➤
                    </span>
                  </button>
                  <div
                    className={`grid px-9 pb-0 text-[#2a1f0f] transition-all duration-300 ease-out ${
                      isOpen ? "max-h-96 pb-9 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-[15px] leading-[1.9] text-[#322613]">{copy}</p>
                    <ul className="mt-5 space-y-2 text-[13px] leading-[1.8]">
                      {points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 items-center justify-center rounded-full bg-[#1c170a] text-[10px] text-white" aria-hidden>
                            •
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;
