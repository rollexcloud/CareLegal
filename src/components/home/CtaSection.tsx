function CtaSection() {
  return (
    <section id="cta" className="bg-white py-24">
      <div className="mx-auto grid w/full max-w-[940px] gap-8 px-4 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#b4975a]">Do You Need Legal Help?</p>
        <h2 className="text-[34px] font-semibold leading-tight text-[#1c170a] sm:text-[42px]">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </h2>
        <p className="text-[15px] leading-[1.9] text-[#5c5541]">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.35em] sm:flex-row">
          <a
            href="/contact"
            className="inline-flex items-center justify-center border border-[#1c170a] px-7 py-3 text-[#1c170a] transition hover:bg-[#1c170a] hover:text-white"
          >
            Schedule A Consultation
          </a>
          <a
            href="tel:1234567890"
            className="inline-flex items-center justify-center border border-[#b4975a] bg-[#b4975a] px-7 py-3 text-[#1c170a] transition hover:bg-[#c7a24a]"
          >
            Free Evaluation
          </a>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
