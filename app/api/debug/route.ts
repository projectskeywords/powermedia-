import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/debug?secret=powermedia-admin-2025
 * Verifică starea env vars și conexiunea Redis
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== (process.env.ADMIN_SECRET ?? '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const upstashUrl = (process.env.UPSTASH_REDIS_REST_URL ?? '').trim()
  const upstashToken = (process.env.UPSTASH_REDIS_REST_TOKEN ?? '').trim()
  const smtpHost = process.env.SMTP_HOST ?? ''
  const smtpUser = process.env.SMTP_USER ?? ''
  const smtpPass = process.env.SMTP_PASS ?? ''
  const smtpPort = process.env.SMTP_PORT ?? ''
  const smtpTo = process.env.SMTP_TO ?? ''
  const indexNowKey = process.env.INDEXNOW_KEY ?? ''

  const result: Record<string, unknown> = {
    env: {
      UPSTASH_REDIS_REST_URL: upstashUrl ? `✅ set (${upstashUrl.substring(0, 30)}...)` : '❌ MISSING',
      UPSTASH_REDIS_REST_TOKEN: upstashToken ? `✅ set (length: ${upstashToken.length})` : '❌ MISSING',
      SMTP_HOST: smtpHost || '❌ MISSING',
      SMTP_PORT: smtpPort || '❌ MISSING',
      SMTP_USER: smtpUser || '❌ MISSING',
      SMTP_PASS: smtpPass ? `✅ set (length: ${smtpPass.length})` : '❌ MISSING',
      SMTP_TO: smtpTo || '❌ MISSING',
      INDEXNOW_KEY: indexNowKey || '❌ MISSING',
    },
  }

  // Test Redis connection
  if (upstashUrl && upstashToken) {
    try {
      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([['GET', 'articles']]),
        cache: 'no-store',
      })
      const data = await res.json() as Array<{ result: string | null }>
      const raw = data[0]?.result

      let articleCount = 0
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          const arr = typeof parsed === 'string' ? JSON.parse(parsed) : parsed
          articleCount = Array.isArray(arr) ? arr.length : 0
        } catch { /* ignore */ }
      }

      result.redis = {
        status: res.status,
        ok: res.ok,
        hasData: !!raw,
        articleCount,
      }
    } catch (e) {
      result.redis = { error: String(e) }
    }
  } else {
    result.redis = { skipped: 'env vars missing' }
  }

  return NextResponse.json(result)
}
