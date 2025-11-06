import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Our Team", href: "/our-team" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const contactDetails = [
  "B-12, Defence Colony, New Delhi",
  "Mumbai • Bengaluru • Remote Counsel",
  "Email: info@carelegal.in",
  "Phone: +91 98111 22233",
];

const accolades = [
  "Recognised among India’s leading boutique litigation firms",
  "Partners ranked in Chambers Asia-Pacific & Legal500",
  "Trusted advisors to VC funds, family offices, and public companies",
];

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40 py-16 text-muted-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Care Legal 
            </span>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Litigation-first. Strategy driven. Confidential by design.
            </h2>
            <p className="max-w-2xl text-sm sm:text-base">
              We represent founders, families, and multinational corporations across India’s commercial hubs. Our team combines court craft with boardroom insight, helping clients navigate critical disputes and transactional inflection points.
            </p>
            <ul className="grid gap-3 text-sm sm:grid-cols-2">
              {accolades.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-secondary-foreground/40" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div className="space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
                Quick access
              </h3>
              <ul className="space-y-3 text-sm">
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="transition hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
                Chambers
              </h3>
              <ul className="space-y-3 text-sm">
                {contactDetails.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="pt-2 text-sm text-muted-foreground/80">
                <p>Office hours: Monday – Friday, 9:30 AM to 7:00 PM IST</p>
                <p>Emergency counsel available 24/7 for critical matters.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Care Legal </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="transition hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-foreground">
              Terms of Engagement
            </Link>
            <span>Crafted for discerning legal counsel.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;