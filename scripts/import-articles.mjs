// Creates the articles table (db/schema.sql) and upserts articles from a JSON file.
//
// Usage (DATABASE_URL in .env.local, never committed):
//   node --env-file=.env.local scripts/import-articles.mjs path/to/articles.json
//
// The JSON file is an array of StoredArticle objects (id, topic, createdAt, ro, ru, en, images).
// Re-running is safe: existing ids are updated, nothing is deleted.

import { readFile } from 'node:fs/promises'
import { neon } from '@neondatabase/serverless'

const [file] = process.argv.slice(2)
const url = (process.env.DATABASE_URL ?? '').trim()

if (!file) throw new Error('Usage: node --env-file=.env.local scripts/import-articles.mjs <articles.json>')
if (!url) throw new Error('DATABASE_URL is not set')

const articles = JSON.parse(await readFile(file, 'utf8'))
if (!Array.isArray(articles)) throw new Error(`${file} must contain a JSON array of articles`)

const LANGS = ['ro', 'ru', 'en']
for (const a of articles) {
  const missing = ['id', 'topic', 'createdAt', ...LANGS].filter((k) => !a?.[k])
  if (missing.length) throw new Error(`Article ${a?.id ?? '?'} is missing: ${missing.join(', ')}`)
}

const sql = neon(url)
const schema = await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8')
for (const statement of schema.split(';').map((s) => s.replace(/--.*$/gm, '').trim()).filter(Boolean)) {
  await sql.query(statement)
}

for (const a of articles) {
  await sql.query(
    `INSERT INTO articles (id, topic, created_at, ro, ru, en, images)
     VALUES ($1, $2, $3, $4::jsonb, $5::jsonb, $6::jsonb, $7::jsonb)
     ON CONFLICT (id) DO UPDATE SET
       topic = EXCLUDED.topic, created_at = EXCLUDED.created_at,
       ro = EXCLUDED.ro, ru = EXCLUDED.ru, en = EXCLUDED.en, images = EXCLUDED.images`,
    [a.id, a.topic, a.createdAt, JSON.stringify(a.ro), JSON.stringify(a.ru), JSON.stringify(a.en), JSON.stringify(a.images ?? [])]
  )
}

const [{ count }] = await sql.query('SELECT count(*)::int AS count FROM articles')
console.log(`Imported ${articles.length} articles. Table now has ${count} rows.`)
