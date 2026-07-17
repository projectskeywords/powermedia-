import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/smtp'

interface ContactBody {
  name?: string
  email?: string
  phone?: string
  message?: string
  lang?: string
  consent?: boolean
  consentAt?: string
}

/** Limite de lungime — apără căsuța poștală de trimiteri abuzive. */
const MAX_LENGTHS = {
  name: 200,
  email: 320,
  phone: 40,
  message: 5000,
} as const

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ContactBody
    const { name, email, message, lang = 'ro', phone, consent, consentAt } = body

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'name, phone, and message are required' },
        { status: 400 }
      )
    }

    // Temeiul legal al acestei prelucrări este consimțământul. Fără el nu avem
    // dreptul să prelucrăm datele, indiferent ce trimite clientul — o bifă în
    // browser se poate ocoli, verificarea de aici nu.
    if (consent !== true) {
      return NextResponse.json(
        { error: 'Consent is required to process this request' },
        { status: 400 }
      )
    }

    if (
      name.length > MAX_LENGTHS.name ||
      phone.length > MAX_LENGTHS.phone ||
      message.length > MAX_LENGTHS.message ||
      (email !== undefined && email.length > MAX_LENGTHS.email)
    ) {
      return NextResponse.json({ error: 'Field too long' }, { status: 400 })
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
      }
    }

    // Momentul acordului vine de la client, deci nu e de încredere: îl
    // păstrăm doar ca indiciu, iar dovada o constituie ora serverului.
    const consentRecordedAt = new Date().toISOString()

    await sendContactEmail({
      name,
      email: email ?? '',
      phone,
      message,
      lang,
      consentAt: consentAt ?? consentRecordedAt,
      consentRecordedAt,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // Detaliile rămân în logurile serverului; către client pleacă un mesaj
    // generic, ca să nu expunem configurația internă.
    console.error('[Contact API Error]', error)
    return NextResponse.json(
      { error: 'Could not send message' },
      { status: 500 }
    )
  }
}
