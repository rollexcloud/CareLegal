"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  summary: string;
  highlight: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Care Legal guided us through a multi-jurisdiction dispute with remarkable precision. Their team anticipated every move and negotiated a settlement that protected our brand and bottom line.",
    summary:
      "Working with Care Legal felt like having an in-house legal think tank. They coordinated seamlessly with our executives and delivered decisive, strategic advice at every turn.",
    highlight: "The team navigated high-stakes litigation with clarity, dedication, and strategic precision.",
    name: "James Kelly",
    role: "CEO & Founder, Aurora Holdings",
  },
  {
    quote:
      "From regulatory compliance to high-impact arbitrations, Care Legal consistently delivers results. Their counsel is focused, commercially astute, and always aligned with our objectives.",
    summary:
      "They don't just interpret the law—they translate it into actionable strategies. Every engagement has reinforced our confidence in their judgment.",
    highlight: "Our cross-border transaction closed ahead of schedule thanks to their proactive approach.",
    name: "Nisha Rao",
    role: "General Counsel, Meridian Ventures",
  },
  {
    quote:
      "The advocates at Care Legal are relentless. Their trial preparation, witness coaching, and courtroom presence secured a verdict we never thought possible.",
    summary:
      "Beyond the courtroom, they became trusted advisors, keeping our leadership informed and empowered throughout an emotionally taxing process.",
    highlight: "They treated our matter like their own—every detail was meticulously handled.",
    name: "Arjun Patel",
    role: "Managing Director, Skyline Infrastructure",
  },
];

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;
  const activeTestimonial = testimonials[activeIndex];

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 8000);

    return () => clearInterval(id);
  }, [total]);

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);

  return (
    <section id="testimonials" className="bg-[#f6f1e6] pb-28 pt-24">
      <div className="mx-auto flex w-full max-w-[1140px] flex-col gap-12 px-4 sm:px-6">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#b4975a]">
            What Our Clients Say About Us
          </p>
        </div>

        <article className="grid gap-8 rounded-[28px] bg-white px-10 py-12 shadow-[0_20px_45px_rgba(0,0,0,0.15)] md:grid-cols-[0.7fr_0.3fr]">
          <div key={activeTestimonial.name} className="space-y-6 text-left transition-all duration-500 ease-out">
            <span className="text-5xl text-[#d8b86a]">“</span>
            <p className="-mt-6 text-[18px] leading-[1.9] text-[#3b3527]">“{activeTestimonial.quote}”</p>
            <p className="text-[15px] leading-[1.9] text-[#5c5541]">{activeTestimonial.summary}</p>
            <div className="pt-6 text-[13px] font-semibold uppercase tracking-[0.35em] text-[#1c170a]">
              <p>{activeTestimonial.name}</p>
              <p className="mt-1 text-[11px] font-medium text-[#6f684f]">{activeTestimonial.role}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#c7a24a]/40 text-[#1c170a] transition hover:border-[#c7a24a] hover:bg-[#c7a24a] hover:text-white"
                  aria-label="Previous testimonial"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#c7a24a]/40 text-[#1c170a] transition hover:border-[#c7a24a] hover:bg-[#c7a24a] hover:text-white"
                  aria-label="Next testimonial"
                >
                  ›
                </button>
              </div>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-pressed={activeIndex === index}
                    className={`h-2.5 w-7 rounded-full transition ${
                      activeIndex === index
                        ? "bg-[#c7a24a]"
                        : "bg-[#e6dcc7] hover:bg-[#c7a24a]/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between border-l border-[#ede4d1] pl-8">
            <p className="text-[13px] leading-[1.9] text-[#5c5541]">“{activeTestimonial.highlight}”</p>
            <div className="mt-8 space-y-3">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Read testimonial from ${testimonial.name}`}
                  aria-pressed={activeIndex === index}
                  className={`w-full rounded-[18px] border px-5 py-4 text-left transition ${
                    activeIndex === index
                      ? "border-[#c7a24a] bg-[#c7a24a]/20 text-[#1c170a]"
                      : "border-transparent text-[#5c5541] hover:border-[#c7a24a]/40 hover:bg-[#c7a24a]/10"
                  }`}
                >
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.35em]">
                    {testimonial.name}
                  </span>
                  <span className="mt-1 block text-[11px] text-[#857b62]">{testimonial.role}</span>
                </button>
              ))}
            </div>

          </div>
        </article>
      </div>
    </section>
  );
}

export default TestimonialsSection;
