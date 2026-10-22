import { timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'

export const ADMIN_COOKIE = 'pm_admin'

// API routes are excluded from proxy.ts, so each admin endpoint must check the cookie itself.
export function isAdminRequest(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET
  const token = req.cookies.get(ADMIN_COOKIE)?.value
  if (!secret || !token) return false

  const a = Buffer.from(token)
  const b = Buffer.from(secret)
  return a.length === b.length && timingSafeEqual(a, b)
}

export function unauthorized(): NextResponse {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
