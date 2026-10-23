import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

// Neon Postgres over HTTP — one stateless request per query, suited to Vercel functions.

let client: NeonQueryFunction<false, false> | null = null

function getClient(): NeonQueryFunction<false, false> {
  if (client) return client
  const url = (process.env.DATABASE_URL ?? '').trim()
  if (!url) throw new Error('DATABASE_URL is not set')
  client = neon(url)
  return client
}

/** Runs a parameterized query ($1, $2, …) and returns the rows. Throws on any failure. */
export async function query<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T[]> {
  return (await getClient().query(text, params)) as T[]
}
