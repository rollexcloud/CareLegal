import FooterSection from "@/components/home/FooterSection";
import LoginForm from "./LoginForm";

const LOGIN_BG =
  "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1";

export const metadata = {
  title: "Admin Login | CareLegal",
};

type LoginPageProps = {
  searchParams: {
    returnTo?: string;
  };
};

export default function BlogAdminLoginPage({ searchParams }: LoginPageProps) {
  const returnTo = searchParams?.returnTo;

  if (!process.env.BLOG_ADMIN_PASSWORD || !process.env.BLOG_ADMIN_USERNAME) {
    return (
      <main className="min-h-screen bg-[#f6f1e6] py-32">
        <div className="mx-auto max-w-xl border border-[#d8c9a9] bg-white p-10 text-center shadow-[0_30px_70px_rgba(0,0,0,0.1)]">
          <h1 className="text-3xl font-semibold text-[#1c170a]">Admin password not configured</h1>
          <p className="mt-6 text-sm leading-relaxed text-[#5c5541]">
            Set the <code className="bg-[#f1ead7] px-1 py-0.5 text-xs text-[#1c170a]">BLOG_ADMIN_USERNAME</code> and
            <code className="ml-1 bg-[#f1ead7] px-1 py-0.5 text-xs text-[#1c170a]">BLOG_ADMIN_PASSWORD</code> environment variables to
            enable the admin panel.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[#080809]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${LOGIN_BG})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#111013]/92 to-[#1b1714]/88" aria-hidden />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 lg:px-10">
          <div className="w-full max-w-5xl border border-white/10 bg-white/5 p-10 text-white shadow-[0_55px_120px_rgba(0,0,0,0.45)] backdrop-blur">
            <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-10">
                <span className="inline-flex items-center border border-[#c7a24a]/50 bg-[#c7a24a]/15 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.45em] text-[#e8c66d]">
                  Care Legal Admin
                </span>
                <h1 className="text-[38px] font-semibold leading-tight sm:text-[46px]">
                  Secure access for your firm’s private workspace
                </h1>
                <p className="max-w-xl text-[15px] leading-[1.9] text-white/75">
                  Manage articles, attorney profiles, and media assets from a single dashboard. Provide your assigned credentials to proceed to the admin console.
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="border border-white/10 bg-white/5 p-5 text-white/80">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.35em] text-[#e8c66d]">System Status</p>
                    <p className="mt-3 text-[28px] font-semibold text-white">99.9%</p>
                    <p className="text-[13px] leading-[1.8]">Uptime for content management APIs with automated monitoring.</p>
                  </div>
                  <div className="border border-white/10 bg-white/5 p-5 text-white/80">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.35em] text-[#e8c66d]">Encryption</p>
                    <p className="mt-3 text-[28px] font-semibold text-white">256-bit</p>
                    <p className="text-[13px] leading-[1.8]">Sessions protected with HTTP-only cookies and TLS security.</p>
                  </div>
                </div>
                <ul className="grid gap-3 text-[13px] leading-[1.8] text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 bg-[#c7a24a]" aria-hidden />
                    Multi-factor verification enforced via secure session cookies.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 bg-[#c7a24a]" aria-hidden />
                    Sessions automatically expire after 12 hours of inactivity.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 bg-[#c7a24a]" aria-hidden />
                    Contact the chambers lead if you need to reset credentials.
                  </li>
                </ul>
                <div className="border border-white/10 bg-black/40 p-4 text-[13px] leading-[1.8] text-white/70">
                  Need assistance? Email <a href="mailto:support@carelegal.in" className="text-[#e8c66d] underline underline-offset-4">support@carelegal.in</a> or call +91 98765 43210 (Mon–Sat, 9AM–7PM IST).
                </div>
              </div>

              <div className="relative border border-white/10 bg-white px-8 py-10 text-[#1c170a] shadow-[0_40px_85px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-[#c7a24a] via-[#e5c777] to-[#c7a24a]" aria-hidden />
                <div className="space-y-3">
                  <h2 className="text-[26px] font-semibold text-[#1c170a]">Administrator sign in</h2>
                  <p className="text-[13px] leading-[1.8] text-[#5c5541]">
                    Use the credentials provided by Care Legal leadership to continue.
                  </p>
                </div>
                <div className="mt-8">
                  <LoginForm returnTo={returnTo} />
                </div>
                <div className="mt-6 border border-[#d8c9a9]/60 bg-[#fff8ea] px-5 py-4 text-[12px] leading-[1.8] text-[#4f4324]">
                  <p className="font-semibold uppercase tracking-[0.3em] text-[#b4975a]">Security reminder</p>
                  <p className="mt-2">Only authorized staff may access these tools. Every sign-in is logged and reviewed daily.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
