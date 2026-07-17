/**
 * Email sending via Resend (primary) with nodemailer fallback.
 * Resend works reliably on Vercel serverless — no SMTP port issues.
 */

import nodemailer from 'nodemailer'

interface ContactEmailData {
  name: string
  email: string
  phone?: string
  message: string
  lang: string
  /** Momentul bifării, raportat de browser. Orientativ. */
  consentAt?: string
  /** Momentul primirii pe server. Aceasta este dovada. */
  consentRecordedAt?: string
}

/**
 * Escapează conținutul introdus de vizitator înainte de a-l pune în HTML.
 *
 * Fără asta, oricine poate injecta markup în e-mailurile pe care le primim —
 * linkuri false, formatare care ascunde textul real, imagini de urmărire.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildHtml(data: ContactEmailData): string {
  const name = escapeHtml(data.name)
  const phone = data.phone ? escapeHtml(data.phone) : ''
  const email = data.email ? escapeHtml(data.email) : ''
  const message = escapeHtml(data.message)
  const lang = escapeHtml(data.lang.toUpperCase())

  return `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px;">
  <div style="background:#0a0a0a;padding:24px;border-radius:8px;margin-bottom:24px;">
    <h1 style="color:#e8ff00;margin:0;font-size:20px;">Powermedia</h1>
    <p style="color:#888;margin:4px 0 0;">Mesaj nou de pe site</p>
  </div>
  <table style="width:100%;border-collapse:collapse;">
    <tr>
      <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;width:120px;">Nume:</td>
      <td style="padding:12px;border-bottom:1px solid #eee;">${name}</td>
    </tr>
    ${phone ? `<tr>
      <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">Telefon:</td>
      <td style="padding:12px;border-bottom:1px solid #eee;">${phone}</td>
    </tr>` : ''}
    ${email ? `<tr>
      <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">Email:</td>
      <td style="padding:12px;border-bottom:1px solid #eee;"><a href="mailto:${encodeURIComponent(data.email)}">${email}</a></td>
    </tr>` : ''}
    <tr>
      <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">Limbă:</td>
      <td style="padding:12px;border-bottom:1px solid #eee;">${lang}</td>
    </tr>
  </table>
  <div style="margin-top:24px;padding:20px;background:#f9f9f9;border-radius:8px;border-left:4px solid #e8ff00;">
    <h3 style="margin:0 0 12px;">Mesaj:</h3>
    <p style="margin:0;white-space:pre-wrap;">${message}</p>
  </div>
  <div style="margin-top:16px;padding:16px;background:#f4f4f4;border-radius:8px;">
    <p style="margin:0;color:#555;font-size:12px;">
      <strong>Consimțământ pentru prelucrarea datelor:</strong> acordat prin bifarea
      căsuței din formular.<br>
      Înregistrat pe server: ${escapeHtml(data.consentRecordedAt ?? '-')}<br>
      Raportat de browser: ${escapeHtml(data.consentAt ?? '-')}
    </p>
    <p style="margin:8px 0 0;color:#888;font-size:11px;">
      Păstrează acest e-mail: constituie dovada consimțământului (Legea nr. 195/2024).
    </p>
  </div>
  <p style="color:#888;font-size:12px;margin-top:24px;">
    Trimis de pe <a href="https://powermedia.md">powermedia.md</a>
  </p>
</body>
</html>`
}

function buildText(data: ContactEmailData): string {
  return [
    `De la: ${data.name}`,
    `Telefon: ${data.phone ?? '-'}`,
    `Email: ${data.email || '-'}`,
    '',
    data.message,
    '',
    '--',
    'Consimțământ acordat prin bifarea căsuței din formular.',
    `Înregistrat pe server: ${data.consentRecordedAt ?? '-'}`,
    `Raportat de browser: ${data.consentAt ?? '-'}`,
  ].join('\n')
}

async function sendViaResend(data: ContactEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY!
  const toAddress = process.env.SMTP_TO ?? 'projects@keywords.md'

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Powermedia <onboarding@resend.dev>',
      to: [toAddress],
      reply_to: data.email || undefined,
      subject: `[Powermedia] Mesaj nou de la ${data.name}`,
      html: buildHtml(data),
      text: buildText(data),
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Resend error ${res.status}: ${err}`)
  }
}

async function sendViaSmtp(data: ContactEmailData): Promise<void> {
  const host = process.env.SMTP_HOST ?? 'smtp.gmail.com'
  const port = Number(process.env.SMTP_PORT ?? 587)
  const toAddress = process.env.SMTP_TO ?? 'projects@keywords.md'

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Certificatul serverului SMTP se verifică. Fără verificare, datele din
    // formular (nume, telefon, mesaj) pot fi interceptate printr-un certificat
    // fals — exact contrariul securității prelucrării cerute de lege.
    tls: { rejectUnauthorized: true },
    connectionTimeout: 10000,
    socketTimeout: 15000,
  })

  await transporter.sendMail({
    from: `"Powermedia Contact" <${process.env.SMTP_USER}>`,
    to: toAddress,
    replyTo: data.email || undefined,
    subject: `[Powermedia] Mesaj nou de la ${data.name}`,
    html: buildHtml(data),
    text: buildText(data),
  })
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY

  if (resendKey) {
    return sendViaResend(data)
  }

  // Fallback la SMTP dacă RESEND_API_KEY nu e setat
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  if (!smtpUser || !smtpPass) {
    throw new Error('Email not configured: set RESEND_API_KEY (recommended) or SMTP_USER + SMTP_PASS')
  }

  return sendViaSmtp(data)
}
