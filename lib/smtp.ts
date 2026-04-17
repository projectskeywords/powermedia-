import nodemailer from 'nodemailer'

interface ContactEmailData {
  name: string
  email: string
  phone?: string
  message: string
  lang: string
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Powermedia Contact" <${process.env.SMTP_USER}>`,
    to: 'vlad@keywords.md',
    replyTo: data.email,
    subject: `[Powermedia] Mesaj nou de la ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0a0a0a; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <h1 style="color: #e8ff00; margin: 0; font-size: 20px;">Powermedia</h1>
          <p style="color: #888; margin: 4px 0 0;">Mesaj nou de pe site</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Nume:</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
              <a href="mailto:${data.email}">${data.email}</a>
            </td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${data.phone}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Limbă:</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${data.lang.toUpperCase()}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding: 20px; background: #f9f9f9; border-radius: 8px; border-left: 4px solid #e8ff00;">
          <h3 style="margin: 0 0 12px;">Mesaj:</h3>
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="color: #888; font-size: 12px; margin-top: 24px;">
          Trimis de pe <a href="https://powermedia.md">powermedia.md</a>
        </p>
      </body>
      </html>
    `,
  })
}
