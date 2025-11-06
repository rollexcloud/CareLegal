import Image from "next/image";

const contactDetails = [
  {
    label: "Give Us A Call",
    value: "123 456 7890",
    helper: "Speak directly with our intake coordinators",
  },
  {
    label: "Email Us At",
    value: "contact@carelegal.com",
    helper: "We respond within one business day",
  },
  {
    label: "Visit Our Office",
    value: "5th Avenue, New York, NY",
    helper: "Monday to Friday, advance appointments preferred",
  },
];

const officeHours = [
  { day: "Monday - Friday", time: "09:00 AM - 06:00 PM" },
  { day: "Saturday", time: "10:00 AM - 02:00 PM" },
  { day: "Sunday", time: "By Appointment Only" },
];

const CONTACT_IMAGE =
  "https://images.pexels.com/photos/7876295/pexels-photo-7876295.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1";

function ContactInfoSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0a0a0d] py-28 text-white">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${CONTACT_IMAGE})` }} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-[#12110f]/92 to-[#1f1a16]/88" aria-hidden />
      <div className="relative mx-auto flex w/full max-w-[1140px] flex-col gap-14 px-4 sm:px-6">
        <header className="max-w-3xl space-y-5 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#e5c777]">Contact</p>
          <h2 className="text-[36px] font-semibold text-white sm:text-[42px]">Let’s discuss your next legal move</h2>
          <p className="text-[15px] leading-[1.9] text-white/75">
            Share a few details about your matter and our attorneys will coordinate a consultation tailored to your needs.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div className="space-y-8 border border-white/10 bg-white/5 px-10 py-10 text-left shadow-[0_28px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <div className="space-y-6">
              {contactDetails.map(({ label, value, helper }) => (
                <div key={label} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.35em] text-[#e5c777]">{label}</p>
                  <p className="mt-3 text-[22px] font-semibold text-white">{value}</p>
                  <p className="mt-2 text-[13px] leading-[1.8] text-white/65">{helper}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 rounded border border-white/10 bg-black/35 px-6 py-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.35em] text-[#e5c777]">Office Hours</p>
              <ul className="space-y-2 text-[13px] leading-[1.9] text-white/70">
                {officeHours.map(({ day, time }) => (
                  <li key={day} className="flex items-start justify-between gap-4">
                    <span>{day}</span>
                    <span className="font-medium text-white/85">{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded border border-white/10 bg-black/25 px-6 py-6 text-[13px] leading-[1.9] text-white/70">
              Complimentary parking and private meeting rooms are available for scheduled consultations. Let us know if you
              require accessibility accommodations.
            </div>
          </div>

          <div className="relative border border-white/10 bg-white px-10 py-12 text-left text-[#1c170a] shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-[#c7a24a] via-[#e5c777] to-[#c7a24a]" aria-hidden />
            <h3 className="text-[24px] font-semibold">Request A Consultation</h3>
            <p className="mt-3 text-[14px] leading-[1.8] text-[#5c5541]">
              Complete the form and we’ll be in touch shortly. All information is kept confidential.
            </p>

            <form className="mt-8 grid gap-6" noValidate>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#6f684f]">
                  Full Name
                  <input
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    placeholder="Enter your name"
                    className="mt-3 w/full border border-[#e0d6bf] bg-white px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/30"
                    required
                  />
                </label>
                <label className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#6f684f]">
                  Email Address
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="mt-3 w/full border border-[#e0d6bf] bg-white px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/30"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#6f684f]">
                  Phone Number
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="(123) 456-7890"
                    className="mt-3 w/full border border-[#e0d6bf] bg-white px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/30"
                  />
                </label>
                <label className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#6f684f]">
                  Matter Type
                  <input
                    type="text"
                    name="matter"
                    placeholder="Corporate litigation, arbitration, etc."
                    className="mt-3 w/full border border-[#e0d6bf] bg-white px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/30"
                  />
                </label>
              </div>

              <label className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#6f684f]">
                Brief Overview
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Provide a short summary of your legal issue so we can prepare for the consultation."
                  className="mt-3 w/full resize-none border border-[#e0d6bf] bg-white px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/30"
                  required
                />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-start gap-3 text-[12px] leading-[1.8] text-[#6f684f]">
                  <input type="checkbox" name="privacy" className="mt-1 h-4 w-4 border border-[#c7a24a] accent-[#c7a24a]" required />
                  I understand that submitting this form does not create an attorney-client relationship.
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-[#c7a24a] px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#1c170a] transition hover:bg-[#e5c777]"
                >
                  Schedule Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactInfoSection;
