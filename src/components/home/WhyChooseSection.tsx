const faqItems = [
  {
    question: "How to choose the right lawyer?",
    answer:
      "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar leo.",
  },
  {
    question: "What is the right way of fighting for your rights?",
    answer:
      "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, adipiscing elit. Ut elit tellus, luctus nec mattis, pulvinar dapibus leo.",
  },
  {
    question: "How to deal with property matters?",
    answer:
      "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus ullamcorper mattis, pulvinar dapibus leo.",
  },
  {
    question: "How to fight forgeries?",
    answer:
      "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
];

function WhyChooseSection() {
  return (
    <section
      id="why-choose"
      className="relative overflow-hidden bg-[#171210] pb-28 pt-28 text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#1a120e]/92 to-[#2e1f17]/88" aria-hidden />
      <div className="relative mx-auto grid w/full max-w-[1140px] gap-14 px-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="space-y-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#e5c777]">Why Choose Us</p>
          <h2 className="text-[36px] font-semibold leading-tight text-white sm:text-[44px]">
            Our team offers experienced guidance and practical solutions for every legal challenge.
          </h2>
          <p className="text-[16px] leading-[1.9] text-white/70">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="grid gap-3 text-[14px] text-white/70">
            <span>• Dedicated trial lawyers with global reach</span>
            <span>• Integrated advisory and litigation teams</span>
            <span>• Transparent communication at every step</span>
          </div>
        </div>

        <div className="grid gap-6">
          {faqItems.map(({ question, answer }) => (
            <article key={question} className="border border-[#3a2a1f] bg-[#c7a24a] px-8 py-7 text-[#1c170a] shadow-[0_25px_55px_rgba(0,0,0,0.35)]">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.38em] text-[#1c170a]">
                {question}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.8]">
                {answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;
