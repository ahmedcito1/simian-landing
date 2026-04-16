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
  console.log("[contact] invoked", { method: event.httpMethod, path: event.path });

  if (event.httpMethod !== "POST") {
    console.warn("[contact] rejected non-POST:", event.httpMethod);
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let payload: FormPayload;
  try {
    payload = JSON.parse(event.body || "{}");
    console.log("[contact] payload parsed", {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      messageLen: payload.message?.length,
      emailList: payload.emailList,
    });
  } catch (err) {
    console.error("[contact] JSON parse failed:", err);
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { firstName, lastName, email, phone, message, emailList } = payload;

  if (!firstName || !lastName || !email || !phone || !message) {
    console.warn("[contact] missing fields", {
      firstName: !!firstName,
      lastName: !!lastName,
      email: !!email,
      phone: !!phone,
      message: !!message,
    });
    return { statusCode: 400, body: "Missing required fields" };
  }

  const {
    SMTP_USER,
    SMTP_PASS,
    MAIL_TO = "bader@simiansolution.com,Baderahmadhammoud@gmail.com",
  } = process.env;

  console.log("[contact] env check", {
    SMTP_USER_set: !!SMTP_USER,
    SMTP_USER_value: SMTP_USER ? `${SMTP_USER.slice(0, 3)}…@${SMTP_USER.split("@")[1] || ""}` : "(missing)",
    SMTP_PASS_set: !!SMTP_PASS,
    SMTP_PASS_len: SMTP_PASS?.length ?? 0,
    MAIL_TO,
    all_env_keys: Object.keys(process.env).filter((k) => k.startsWith("SMTP") || k.startsWith("MAIL")),
  });

  if (!SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP creds missing — env vars not set in Netlify");
    return { statusCode: 500, body: "Server not configured" };
  }

  console.log("[contact] creating transporter");
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    console.log("[contact] verifying SMTP connection");
    await transporter.verify();
    console.log("[contact] SMTP verify OK");
  } catch (err) {
    console.error("[contact] SMTP verify FAILED", err);
    return { statusCode: 502, body: `SMTP verify failed: ${err instanceof Error ? err.message : "unknown"}` };
  }

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
    console.log("[contact] sending mail", { to: MAIL_TO, from: SMTP_USER, subject });
    const info = await transporter.sendMail({
      from: `"Simian Website" <${SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: email,
      subject,
      text,
      html,
    });
    console.log("[contact] sendMail OK", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });
    return { statusCode: 200, body: JSON.stringify({ ok: true, messageId: info.messageId }) };
  } catch (err) {
    console.error("[contact] sendMail FAILED", err);
    return {
      statusCode: 502,
      body: `Failed to send: ${err instanceof Error ? err.message : "unknown"}`,
    };
  }
};

export { handler };
