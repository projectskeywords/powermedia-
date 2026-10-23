import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

/**
 * GET /api/debug?secret=<ADMIN_SECRET>
 * Verifică starea env vars și conexiunea la baza de date (Neon)
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const adminSecret = process.env.ADMIN_SECRET

  // Fără ADMIN_SECRET configurat endpointul rămâne închis, nu deschis.
  if (!adminSecret || secret !== adminSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const databaseUrl = (process.env.DATABASE_URL ?? '').trim()
  const smtpHost = process.env.SMTP_HOST ?? ''
  const smtpUser = process.env.SMTP_USER ?? ''
  const smtpPass = process.env.SMTP_PASS ?? ''
  const smtpPort = process.env.SMTP_PORT ?? ''
  const smtpTo = process.env.SMTP_TO ?? ''
  const indexNowKey = process.env.INDEXNOW_KEY ?? ''

  const result: Record<string, unknown> = {
    env: {
      DATABASE_URL: databaseUrl ? `✅ set (host: ${safeHost(databaseUrl)})` : '❌ MISSING',
      SMTP_HOST: smtpHost || '❌ MISSING',
      SMTP_PORT: smtpPort || '❌ MISSING',
      SMTP_USER: smtpUser || '❌ MISSING',
      SMTP_PASS: smtpPass ? `✅ set (length: ${smtpPass.length})` : '❌ MISSING',
      SMTP_TO: smtpTo || '❌ MISSING',
      INDEXNOW_KEY: indexNowKey || '❌ MISSING',
    },
  }

  // Test database connection
  try {
    const [row] = await query<{ count: number; bytes: number }>(
      `SELECT count(*)::int AS count, coalesce(sum(pg_column_size(t.*)), 0)::int AS bytes FROM articles t`
    )
    result.database = { ok: true, articleCount: row.count, tableBytes: row.bytes }
  } catch (e) {
    result.database = { error: String(e) }
  }

  return NextResponse.json(result)
}

function safeHost(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return 'invalid URL'
  }
}
