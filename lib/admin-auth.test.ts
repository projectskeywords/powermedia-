import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { isAdminRequest } from './admin-auth'

function requestWithCookie(value?: string): NextRequest {
  const headers = value ? { cookie: `pm_admin=${value}` } : undefined
  return new NextRequest('https://powermedia.md/api/admin/articles/1', { headers })
}

describe('isAdminRequest', () => {
  beforeEach(() => {
    vi.stubEnv('ADMIN_SECRET', 'correct-secret')
  })

  it('accepts the admin cookie', () => {
    expect(isAdminRequest(requestWithCookie('correct-secret'))).toBe(true)
  })

  it('rejects a missing cookie', () => {
    expect(isAdminRequest(requestWithCookie())).toBe(false)
  })

  it('rejects a wrong cookie, including one of different length', () => {
    expect(isAdminRequest(requestWithCookie('wrong-secret!'))).toBe(false)
    expect(isAdminRequest(requestWithCookie('x'))).toBe(false)
  })

  it('rejects everything when ADMIN_SECRET is not configured', () => {
    vi.stubEnv('ADMIN_SECRET', '')
    expect(isAdminRequest(requestWithCookie(''))).toBe(false)
  })
})
