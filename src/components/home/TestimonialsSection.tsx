function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#f6f1e6] pb-28 pt-24">
      <div className="mx-auto flex w/full max-w-[1140px] flex-col gap-12 px-4 sm:px-6">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#b4975a]">What Our Clients Say About Us</p>
        </div>

        <article className="grid gap-8 bg-white px-10 py-12 shadow-[0_20px_45px_rgba(0,0,0,0.15)] md:grid-cols-[0.7fr_0.3fr]">
          <div className="space-y-6 text-left">
            <span className="text-5xl text-[#d8b86a]">“</span>
            <p className="-mt-6 text-[18px] leading-[1.9] text-[#3b3527]">
              &ldquo;Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.&rdquo;
            </p>
            <div className="pt-6 text-[13px] font-semibold uppercase tracking-[0.35em] text-[#1c170a]">
              <p>James Kelly</p>
              <p className="mt-1 text-[11px] font-medium text-[#6f684f]">CEO & Founder</p>
            </div>
          </div>
          <div className="flex flex-col justify-between border-l border-[#ede4d1] pl-8 text-[12px] leading-[1.9] text-[#5c5541]">
            <p>
              &ldquo;The team navigated high-stakes litigation with clarity, dedication, and strategic precision.&rdquo;
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center justify-center border border-[#1c170a] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#1c170a] transition hover:bg-[#1c170a] hover:text-white"
            >
              View All Testimonials
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

export default TestimonialsSection;
