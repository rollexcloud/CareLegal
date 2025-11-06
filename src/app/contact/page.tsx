"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import FooterSection from "@/components/home/FooterSection";

type FormField = 'name' | 'email' | 'phone' | 'message';

const contactDetails = [
  {
    label: 'Give Us A Call',
    value: '+91 98765 43210',
    helper: 'Speak with our intake coordinators and schedule a consultation',
  },
  {
    label: 'Email Us At',
    value: 'support@carelegal.in',
    helper: 'We aim to reply within one business day',
  },
  {
    label: 'Visit Our Office',
    value: 'Care Legal Chambers, Connaught Place, New Delhi',
    helper: 'Appointments available Monday to Saturday',
  },
];

const officeHours = [
  { day: 'Monday - Friday', time: '09:00 AM - 06:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 02:00 PM' },
  { day: 'Sunday', time: 'By appointment only' },
];

const CONTACT_IMAGE =
  "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1";

function ContactPage() {
  const [formData, setFormData] = useState<Record<FormField, string>>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isPending, setIsPending] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const isSuccess = status === 'success';

  const handleChange = (field: FormField) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status !== 'idle') {
      setStatus('idle');
      setFeedback(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Basic client-side validation
    const message = String(data.get('message') ?? '').trim();
    if (message.length < 40) {
      setStatus('error');
      setFeedback('Please share a brief overview so we can prepare for the consultation.');
      return;
    }

    if (String(data.get('company') ?? '').trim()) {
      // Honeypot triggered - quietly abort
      form.reset();
      return;
    }

    const emailValue = String(data.get('email') ?? '').trim();
    const nameValue = String(data.get('name') ?? '').trim();
    const phoneValue = String(data.get('phone') ?? '').trim();
    const matterValue = String(data.get('matter') ?? '').trim();

    if (!emailValue) {
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }

    data.set('email', emailValue);
    data.append('_replyto', emailValue);
    data.append('_subject', `Consultation request from ${nameValue || 'Care Legal website'}`);
    data.append('submitted_at', new Date().toISOString());

    if (phoneValue) {
      data.set('phone', phoneValue);
    }
    if (matterValue) {
      data.set('matter', matterValue);
    }

    setIsPending(true);
    try {
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      if (!formspreeEndpoint) {
        throw new Error('Form submission endpoint is not configured.');
      }

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: data,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage = typeof result?.error === 'string' ? result.error : 'Failed to submit the form. Please try again.';
        console.error('Formspree submission error', { status: response.status, body: result });
        throw new Error(errorMessage);
      }

      setStatus('success');
      setFeedback('Thank you for reaching out. Our team will contact you shortly.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setAcceptedTerms(false);
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'We were unable to submit your request.';
      setStatus('error');
      setFeedback(message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#080809] py-28">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${CONTACT_IMAGE})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-[#111013]/92 to-[#1c1815]/88" aria-hidden />

        <div className="relative z-10 mx-auto flex w/full max-w-[1100px] flex-col gap-16 px-4 sm:px-6">
          <header className="max-w-3xl space-y-5 text-left text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#e5c777]">Care Legal</p>
            <h1 className="text-[36px] font-semibold leading-tight sm:text-[48px]">Connect with our legal team</h1>
            <p className="text-[15px] leading-[1.9] text-white/75">
              Share your questions, request a consultation, or outline the support you need. Our advocates respond within one business
              day to guide you through the next steps with confidence.
            </p>
          </header>

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr]">
            <div className="space-y-8 border border-white/10 bg-white/5 px-10 py-12 text-white shadow-[0_35px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm">
              <h2 className="text-[26px] font-semibold">Dedicated counsel for every case</h2>
              <p className="text-[15px] leading-[1.9] text-white/70">
                We combine litigation experience with pragmatic advice to deliver tailored strategies for individuals, startups, and
                enterprises. Reach out to discuss civil disputes, compliance needs, or ongoing advisory support.
              </p>

              <div className="space-y-6">
                {contactDetails.map(({ label, value, helper }) => (
                  <div key={label} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.35em] text-[#e5c777]">{label}</p>
                    <p className="mt-3 text-[20px] font-semibold text-white">{value}</p>
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
                Need urgent representation? Mention the nature of your matter in the form and our rapid response team will prioritise your
                request within a few hours.
              </div>
            </div>

            <div className="relative border border-white/10 bg-white px-10 py-12 text-left text-[#1c170a] shadow-[0_38px_95px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-[#c7a24a] via-[#e5c777] to-[#c7a24a]" aria-hidden />
              <h2 className="text-[26px] font-semibold">Request a consultation</h2>
              <p className="mt-3 text-[14px] leading-[1.8] text-[#5c5541]">
                Complete the form and our team will follow up to schedule a confidential discussion.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-6" noValidate>
                <div className="sr-only" aria-hidden>
                  <label>
                    Company
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      name="company"
                    />
                  </label>
                </div>

              {feedback ? (
                <div
                  className={`relative overflow-hidden rounded-[18px] border px-5 py-4 text-[13px] leading-relaxed ${
                    isSuccess
                      ? 'border-[#c7a24a]/60 bg-[#fff8ea] text-[#3d3319]'
                      : 'border-[#c53030]/40 bg-[#fdecec] text-[#5f1e1e]'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <div
                    className={`pointer-events-none absolute inset-0 ${
                      isSuccess
                        ? 'bg-gradient-to-br from-[#f7edd7]/80 via-transparent to-transparent'
                        : 'bg-gradient-to-br from-[#fde3e3]/85 via-transparent to-transparent'
                    }`}
                    aria-hidden
                  />
                  <div className="relative flex items-start gap-3">
                    <span
                      className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-[16px] font-semibold ${
                        isSuccess ? 'bg-[#c7a24a] text-[#1c170a]' : 'bg-[#fbcacb] text-[#7b1c1c]'
                      }`}
                      aria-hidden
                    >
                      {isSuccess ? '✓' : '!'}
                    </span>
                    <div className="space-y-1">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.3em]">
                        {isSuccess ? 'Enquiry received' : 'Submission issue'}
                      </p>
                      <p>{feedback}</p>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#6f684f]">
                  Full Name
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange('name')}
                    placeholder="Enter your full name"
                    className="mt-3 w-full border border-[#dfd3bb] bg-white px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/30"
                    required
                  />
                </label>
                <label className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#6f684f]">
                  Email Address
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    placeholder="you@company.com"
                    className="mt-3 w-full border border-[#dfd3bb] bg-white px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/30"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#6f684f]">
                  Phone Number
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    placeholder="Preferred contact number"
                    className="mt-3 w-full border border-[#dfd3bb] bg-white px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/30"
                  />
                </label>
                <label className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#6f684f]">
                  Matter Type
                  <input
                    id="matter"
                    type="text"
                    name="matter"
                    placeholder="Corporate litigation, arbitration, etc."
                    className="mt-3 w-full border border-[#dfd3bb] bg-white px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/30"
                  />
                </label>
              </div>

              <label className="flex w-full flex-col gap-3 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#6f684f]">
                Brief Overview
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange('message')}
                  rows={6}
                  placeholder="Provide a short summary of your legal issue so we can prepare for the consultation."
                  className="w-full resize-none rounded-[14px] border border-[#dfd3bb] bg-[#faf7f0] px-4 py-4 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/35"
                  required
                />
                <span className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#9b9279]">
                  Kindly omit confidential or privileged details at this stage.
                </span>
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-start gap-3 text-[12px] leading-[1.8] text-[#6f684f]">
                  <input
                    type="checkbox"
                    name="privacy"
                    className="mt-1 h-4 w-4 border border-[#c7a24a] accent-[#c7a24a]"
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    required
                  />
                  I understand that submitting this form does not create an attorney-client relationship.
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-[#c7a24a] px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#1c170a] transition hover:bg-[#e5c777] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isPending || !acceptedTerms}
                >
                  {isPending ? 'Sending…' : 'Submit Enquiry'}
                </button>
              </div>

              <p className="text-[12px] leading-[1.8] text-[#847b64]">
                By submitting this form you agree to receive communications from Care Legal regarding your enquiry. Your information
                will never be shared with third parties.
              </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </>
  );
}

export default ContactPage;
