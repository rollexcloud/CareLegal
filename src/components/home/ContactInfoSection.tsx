const contactDetails = [
  {
    label: "Give Us A Call",
    value: "123 456 7890",
  },
  {
    label: "Email Us At",
    value: "[email protected]",
  },
  {
    label: "Visit Us At",
    value: "5th Avenue, New York, NY",
  },
];

function ContactInfoSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0a0a0d] py-28 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/7876295/pexels-photo-7876295.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/92 via-[#111111]/90 to-[#1d1b17]/85" aria-hidden />
      <div className="relative mx-auto grid w/full max-w-[1140px] gap-10 px-4 text-center sm:px-6">
        <div className="space-y-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#e5c777]">Get In Touch</p>
          <h2 className="text-[36px] font-semibold text-white sm:text-[42px]">We are ready to help</h2>
          <p className="mx-auto max-w-2xl text-[15px] leading-[1.9] text-white/70">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {contactDetails.map(({ label, value }) => (
            <article key={label} className="border border-white/15 bg-white/5 px-6 py-10 text-center shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.35em] text-[#e5c777]">{label}</p>
              <p className="mt-5 text-[18px] font-semibold text-white">{value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactInfoSection;
