const RESEND_API_URL = "https://api.resend.com/emails";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}

export type SendEmailInput = {
  subject: string;
  html: string;
  text: string;
  to?: string;
};

export async function sendTransactionalEmail({ subject, html, text, to }: SendEmailInput): Promise<void> {
  const apiKey = requireEnv("RESEND_API_KEY");
  const from = requireEnv("RESEND_FROM_EMAIL");
  const recipient = to ?? requireEnv("RESEND_TO_EMAIL");

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message = typeof payload?.message === "string" ? payload.message : "Email send failed";
    throw new Error(message);
  }
}
