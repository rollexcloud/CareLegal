'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';

type FormField = 'name' | 'email' | 'phone' | 'message';

const contactDetails = [
  { label: 'Call', value: '+91 98765 43210' },
  { label: 'Email', value: 'support@carelegal.in' },
  { label: 'Office', value: 'Care Legal Chambers, Connaught Place, New Delhi' },
  { label: 'Hours', value: 'Monday – Friday · 9:00 AM – 6:00 PM IST' },
];

function ContactPage() {
  const [formData, setFormData] = useState<Record<FormField, string>>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (field: FormField) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted contact form:', formData);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black/[0.96] bg-grid-white/[0.02] py-28 px-4">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-teal-400 uppercase tracking-[0.35em] text-xs font-semibold">Care Legal</p>
          <h1 className="mt-4 text-4xl font-bold text-neutral-100 md:text-6xl">Connect with our legal team</h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-300 md:text-lg">
            Share your questions, request a consultation, or outline the support you need. Our advocates respond within one business day to guide you through the next steps with confidence.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-8 shadow-xl backdrop-blur">
            <h2 className="text-2xl font-semibold text-neutral-100 md:text-3xl">Dedicated counsel for every case</h2>
            <p className="mt-4 text-neutral-300">
              We combine litigation experience with pragmatic advice to deliver tailored strategies for individuals, startups, and enterprises. Reach out to discuss civil disputes, compliance needs, or ongoing advisory support.
            </p>

            <dl className="mt-10 space-y-6">
              {contactDetails.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.4em] text-teal-400">{item.label}</dt>
                  <dd className="mt-2 text-lg text-neutral-100">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 rounded-2xl border border-teal-500/20 bg-teal-500/10 p-6">
              <p className="text-sm font-medium text-teal-200">
                Need urgent representation?
              </p>
              <p className="mt-2 text-sm text-neutral-200">
                Mention the nature of your matter in the form and our rapid response team will prioritise your request within a few hours.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/70 p-8 shadow-xl backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-neutral-200">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange('name')}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-200">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-neutral-200">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  placeholder="Preferred contact number"
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-neutral-200">
                  Tell us about your matter
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange('message')}
                  placeholder="Briefly describe your legal requirements or questions"
                  rows={6}
                  className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-neutral-100 placeholder:text-neutral-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Submit enquiry
              </button>

              <p className="text-xs text-neutral-500">
                By submitting this form you agree to receive communications from Care Legal regarding your enquiry. Your information will never be shared with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
