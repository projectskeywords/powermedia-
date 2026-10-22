import { NextRequest, NextResponse } from 'next/server'
import { redisPipeline } from '@/lib/upstash'

/**
 * GET /api/debug?secret=<ADMIN_SECRET>
 * Verifică starea env vars și conexiunea Redis
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const adminSecret = process.env.ADMIN_SECRET

  // Fără ADMIN_SECRET configurat endpointul rămâne închis, nu deschis.
  if (!adminSecret || secret !== adminSecret) {
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

  // Test Redis connection — reads only key sizes, never the article content
  try {
    const [indexRaw, indexBytes, legacyBytes] = await redisPipeline([
      ['GET', 'articles:index'],
      ['STRLEN', 'articles:index'],
      ['STRLEN', 'articles'],
    ])
    let articleCount = 0
    if (indexRaw != null) {
      const index = JSON.parse(String(indexRaw))
      articleCount = Array.isArray(index) ? index.length : 0
    }
    result.redis = {
      ok: true,
      migrated: indexRaw != null,
      articleCount,
      indexBytes,
      legacyBlobBytes: legacyBytes,
    }
  } catch (e) {
    result.redis = { error: String(e) }
  }

  return NextResponse.json(result)
}
