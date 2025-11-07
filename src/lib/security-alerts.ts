import nodemailer, { Transporter } from "nodemailer";

type SecurityEvent =
  | {
      type: "login_success" | "login_failure" | "rate_limited";
      username: string;
      ip: string;
      retryAfterMs?: number;
    };

const webhookUrl = process.env.SECURITY_ALERT_WEBHOOK_URL;
const emailFrom = process.env.SECURITY_ALERT_EMAIL_FROM;
const emailTo = process.env.SECURITY_ALERT_EMAIL_TO;
const emailAppPassword = process.env.SECURITY_ALERT_EMAIL_APP_PASSWORD;

let cachedTransporter: Transporter | null = null;

function getEmailTransporter(): Transporter | null {
  if (!emailFrom || !emailAppPassword) {
    return null;
  }

  if (cachedTransporter) {
    return cachedTransporter;
  }

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailFrom,
      pass: emailAppPassword,
    },
  });

  return cachedTransporter;
}

async function postToWebhook(payload: unknown) {
  if (!webhookUrl) {
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to deliver security alert webhook", error);
  }
}

async function sendEmailAlert(subject: string, body: string) {
  if (!emailTo) {
    return;
  }

  const transporter = getEmailTransporter();
  if (!transporter) {
    return;
  }

  try {
    await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      subject,
      text: body,
    });
  } catch (error) {
    console.error("Failed to send security alert email", error);
  }
}

export async function sendSecurityAlert(event: SecurityEvent) {
  const now = new Date().toISOString();

  const text =
    event.type === "login_success"
      ? `✅ Admin login success (${event.username || "unknown"}) from ${event.ip}`
      : event.type === "login_failure"
        ? `⚠️ Admin login failed for ${event.username || "unknown"} from ${event.ip}`
        : `🚫 Admin login rate limited for ${event.username || "unknown"} from ${event.ip}. Retry after ${Math.ceil((event.retryAfterMs ?? 0) / 1000)}s`;

  await Promise.all([
    postToWebhook({
      text,
      timestamp: now,
      event,
    }),
    sendEmailAlert(`Care Legal Admin Alert: ${event.type}`, `${text}\n\nTimestamp: ${now}`),
  ]);
}
