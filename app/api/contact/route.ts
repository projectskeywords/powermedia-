import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/smtp'

interface ContactBody {
  name?: string
  email?: string
  phone?: string
  message?: string
  lang?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ContactBody
    const { name, email, message, lang = 'ro', phone } = body

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'name, phone, and message are required' },
        { status: 400 }
      )
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
      }
    }

    await sendContactEmail({ name, email: email ?? '', phone, message, lang })

    return NextResponse.json({ success: true })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    // Log full error server-side (visible in Vercel Function Logs)
    console.error('[Contact API Error]', error)
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    )
  }
}
