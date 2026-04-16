import type { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";

interface FormPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  emailList: boolean;
}

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let payload: FormPayload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { firstName, lastName, email, phone, message, emailList } = payload;

  if (!firstName || !lastName || !email || !phone || !message) {
    return { statusCode: 400, body: "Missing required fields" };
  }

  const {
    SMTP_USER,
    SMTP_PASS,
    MAIL_TO = "bader@simiansolution.com,Baderahmadhammoud@gmail.com",
  } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    return { statusCode: 500, body: "Server not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const fullName = `${firstName} ${lastName}`.trim();
  const subject = `New project inquiry — ${fullName}`;

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#18181B;">
      <h2 style="margin:0 0 16px;color:#1B9C85;">New project inquiry</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#71717A;width:120px;">Name</td><td>${escape(fullName)}</td></tr>
        <tr><td style="padding:6px 0;color:#71717A;">Email</td><td><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#71717A;">Phone</td><td>${escape(phone)}</td></tr>
        <tr><td style="padding:6px 0;color:#71717A;">Email list</td><td>${emailList ? "Yes" : "No"}</td></tr>
      </table>
      <h3 style="margin:24px 0 8px;font-size:14px;color:#71717A;text-transform:uppercase;letter-spacing:0.1em;">Message</h3>
      <div style="background:#FAFAF7;border-radius:12px;padding:16px;white-space:pre-wrap;line-height:1.6;">
        ${escape(message)}
      </div>
    </div>
  `;

  const text = `New project inquiry

Name: ${fullName}
Email: ${email}
Phone: ${phone}
Email list: ${emailList ? "Yes" : "No"}

Message:
${message}
`;

  try {
    await transporter.sendMail({
      from: `"Simian Website" <${SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: email,
      subject,
      text,
      html,
    });
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("SMTP error", err);
    return { statusCode: 502, body: "Failed to send" };
  }
};

export { handler };
