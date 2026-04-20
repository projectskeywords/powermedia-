/**
 * Google Indexing API — notifică Google direct când un articol e publicat.
 * Necesită un service account Google Cloud cu acces la Search Console.
 *
 * Setup:
 * 1. Creează proiect în Google Cloud Console
 * 2. Activează "Web Search Indexing API"
 * 3. Creează Service Account → descarcă JSON
 * 4. Adaugă email-ul service account-ului ca Owner în Google Search Console
 * 5. Pune conținutul JSON în Vercel env var: GOOGLE_SERVICE_ACCOUNT_JSON
 */

interface ServiceAccount {
  client_email: string
  private_key: string
}

function base64url(data: ArrayBuffer | string): string {
  const bytes =
    typeof data === 'string'
      ? new TextEncoder().encode(data)
      : new Uint8Array(data)
  let str = ''
  for (const b of bytes) str += String.fromCharCode(b)
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function pemToBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '')
  const bin = atob(b64)
  const buf = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i)
  return buf.buffer
}

async function createJWT(serviceAccount: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  const header = { alg: 'RS256', typ: 'JWT' }
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }

  const headerB64 = base64url(JSON.stringify(header))
  const payloadB64 = base64url(JSON.stringify(payload))
  const signingInput = `${headerB64}.${payloadB64}`

  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    pemToBuffer(serviceAccount.private_key),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(signingInput)
  )

  return `${signingInput}.${base64url(signature)}`
}

async function getAccessToken(serviceAccount: ServiceAccount): Promise<string> {
  const jwt = await createJWT(serviceAccount)

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Google OAuth failed: ${res.status} — ${err}`)
  }

  const data = await res.json() as { access_token: string }
  return data.access_token
}

async function notifyGoogle(accessToken: string, url: string): Promise<{ url: string; ok: boolean; status: number }> {
  const res = await fetch(
    `https://indexing.googleapis.com/v3/urlNotifications:publish`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    }
  )

  return { url, ok: res.ok, status: res.status }
}

export async function submitUrlsToGoogle(urls: string[]): Promise<void> {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) {
    console.warn('[Google Indexing] GOOGLE_SERVICE_ACCOUNT_JSON not set — skipping')
    return
  }

  let serviceAccount: ServiceAccount
  try {
    serviceAccount = JSON.parse(raw) as ServiceAccount
  } catch {
    console.error('[Google Indexing] Invalid JSON in GOOGLE_SERVICE_ACCOUNT_JSON')
    return
  }

  try {
    const accessToken = await getAccessToken(serviceAccount)

    const results = await Promise.all(urls.map((url) => notifyGoogle(accessToken, url)))

    for (const r of results) {
      if (r.ok) {
        console.log(`[Google Indexing] ✅ ${r.url}`)
      } else {
        console.warn(`[Google Indexing] ⚠️ ${r.status} — ${r.url}`)
      }
    }
  } catch (err) {
    console.error('[Google Indexing] Error:', err)
  }
}
