import nodemailer from "nodemailer";
import { getNotificationEmail, getSmtpFrom, isSmtpConfigured } from "./env";

export async function sendNotificationEmail(
  subject: string,
  text: string,
): Promise<{ sent: boolean; error?: string }> {
  if (!isSmtpConfigured()) {
    return { sent: false, error: "SMTP not configured" };
  }
  const to = getNotificationEmail();
  if (!to) {
    return { sent: false, error: "NOTIFICATION_EMAIL not configured" };
  }
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: getSmtpFrom(),
      to,
      subject,
      text,
    });
    return { sent: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Email send failed";
    return { sent: false, error: message };
  }
}
