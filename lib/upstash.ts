// Minimal Upstash Redis REST client.
// Throws on any failure so callers never mistake an outage for an empty database.

export type RedisCommand = Array<string | number>

export class RedisError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RedisError'
  }
}

interface RedisConfig {
  url: string
  token: string
}

function getConfig(): RedisConfig {
  const url = (process.env.UPSTASH_REDIS_REST_URL ?? '').trim()
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN ?? '').trim()
  if (!url || !token) {
    throw new RedisError('UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are not set')
  }
  return { url, token }
}

async function send(endpoint: 'pipeline' | 'multi-exec', commands: RedisCommand[]): Promise<unknown[]> {
  const { url, token } = getConfig()

  const res = await fetch(`${url}/${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
    cache: 'no-store',
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new RedisError(`Upstash ${endpoint} failed: ${res.status} ${res.statusText} ${body}`.trim())
  }

  const data = await res.json() as Array<{ result?: unknown; error?: string }>
  return data.map((item, i) => {
    if (item.error) throw new RedisError(`Upstash command ${String(commands[i]?.[0])} failed: ${item.error}`)
    return item.result ?? null
  })
}

/** Runs commands in one round trip (not atomic). */
export function redisPipeline(commands: RedisCommand[]): Promise<unknown[]> {
  return send('pipeline', commands)
}

/** Runs commands atomically (MULTI/EXEC). */
export function redisTransaction(commands: RedisCommand[]): Promise<unknown[]> {
  return send('multi-exec', commands)
}
