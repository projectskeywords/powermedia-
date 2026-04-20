import { GoogleGenerativeAI } from '@google/generative-ai'
import { jsonrepair } from 'jsonrepair'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Model list in priority order — fallback to next if 503/404
// Tested on 2026-04-17: gemini-2.5-flash-lite and gemini-2.5-pro confirmed working
const MODELS = ['gemini-2.5-flash-lite', 'gemini-2.5-pro', 'gemini-2.5-flash']

export interface ArticleVersion {
  title: string
  slug: string
  metaDescription: string
  content: string
  keywords: string[]
  imageQuery: string
}

export interface MultilingualArticle {
  ro: ArticleVersion
  ru: ArticleVersion
  en: ArticleVersion
}

const PROMPTS: Record<string, (topic: string) => string> = {
  ro: (topic) => `
Ești copywriter SEO expert pentru piața din Moldova.
Scrie un articol profesionist în ROMÂNĂ despre: "${topic}"

CERINȚE OBLIGATORII:
- Conține referințe specifice pieței moldovenești (legislație locală, tendințe Chișinău, exemple concrete din Moldova)
- Format: H1 titlu, meta description (max 155 caractere), 5 secțiuni H2, minim 800 cuvinte
- Inserează textul {{INTERLINK_SERVICE}} de 2-3 ori unde este natural să menționezi servicii digitale
- Folosește cuvinte cheie naturale legate de Moldova și Chișinău
- Conținut HTML valid (h1, h2, p, ul, li)

Răspunde STRICT ca JSON valid (fără markdown, fără text extra):
{"title":"...","slug":"...","metaDescription":"...","content":"HTML complet...","keywords":["kw1","kw2","kw3"],"imageQuery":"search query for unsplash in english"}
`,
  ru: (topic) => `
Ты профессиональный SEO-копирайтер для рынка Молдовы.
Напиши профессиональную статью на РУССКОМ о: "${topic}"

ОБЯЗАТЕЛЬНЫЕ ТРЕБОВАНИЯ:
- Включи ссылки на молдавский рынок (местное законодательство, тренды Кишинёва, конкретные молдавские примеры)
- Формат: H1 заголовок, meta description (макс. 155 символов), 5 секций H2, минимум 800 слов
- Вставь текст {{INTERLINK_SERVICE}} 2-3 раза там, где уместно упомянуть цифровые услуги
- Используй натуральные ключевые слова, связанные с Молдовой и Кишинёвом
- Корректный HTML (h1, h2, p, ul, li)

Ответь ТОЛЬКО как валидный JSON (без markdown, без лишнего текста):
{"title":"...","slug":"...","metaDescription":"...","content":"полный HTML...","keywords":["kw1","kw2","kw3"],"imageQuery":"search query for unsplash in english"}
`,
  en: (topic) => `
You are a professional SEO copywriter targeting the European market.
Write a professional article in ENGLISH about: "${topic}"

REQUIREMENTS:
- Target European businesses (EU regulations, European digital trends, international examples)
- Format: H1 title, meta description (max 155 chars), 5 H2 sections, minimum 800 words
- Insert the text {{INTERLINK_SERVICE}} 2-3 times where naturally mentioning digital services
- Use natural keywords relevant to European digital market
- Valid HTML (h1, h2, p, ul, li)

Respond STRICTLY as valid JSON (no markdown, no extra text):
{"title":"...","slug":"...","metaDescription":"...","content":"full HTML...","keywords":["kw1","kw2","kw3"],"imageQuery":"search query for unsplash in english"}
`,
}

function parseArticle(text: string): ArticleVersion {
  // Strip markdown code fences if Gemini wrapped the JSON
  const stripped = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim()
  const jsonMatch = stripped.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Invalid Gemini response: no JSON found')

  // First try plain JSON.parse, then fall back to jsonrepair for malformed output
  let raw = jsonMatch[0]
  try {
    return JSON.parse(raw) as ArticleVersion
  } catch {
    try {
      return JSON.parse(jsonrepair(raw)) as ArticleVersion
    } catch (repairErr) {
      throw new Error(`Gemini JSON unparseable even after repair: ${repairErr}`)
    }
  }
}

// Errors worth retrying on the SAME model (transient overload)
function isRetryable(err: unknown): boolean {
  if (!(err instanceof Error)) return false
  const msg = err.message.toLowerCase()
  return (
    msg.includes('503') ||
    msg.includes('service unavailable') ||
    msg.includes('high demand') ||
    msg.includes('overloaded') ||
    msg.includes('429') ||
    msg.includes('rate limit') ||
    msg.includes('quota')
  )
}

// Errors that mean this model is permanently unavailable → skip to next model
function isModelUnavailable(err: unknown): boolean {
  if (!(err instanceof Error)) return false
  const msg = err.message.toLowerCase()
  return (
    msg.includes('404') ||
    msg.includes('not found') ||
    msg.includes('no longer available') ||
    msg.includes('not supported for generatecontent')
  )
}

async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

async function generateWithRetry(prompt: string): Promise<string> {
  // Try each model with its own retry attempts
  for (const modelName of MODELS) {
    // Pass apiVersion: 'v1' here — Gemini 3.x models live on v1, not v1beta
    const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: 'v1' })
    const maxRetries = 5

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await model.generateContent(prompt)
        return result.response.text()
      } catch (err: unknown) {
        const retryable = isRetryable(err)

        if (retryable && attempt < maxRetries) {
          // Exponential backoff: 4s, 8s, 16s, 32s, 60s
          const delay = Math.min(4000 * Math.pow(2, attempt), 60000)
          console.log(
            `[Gemini] ${modelName} attempt ${attempt + 1} failed (503), retrying in ${delay / 1000}s...`
          )
          await sleep(delay)
          continue
        }

        // Retries exhausted → try next model
        if (retryable) {
          console.log(`[Gemini] ${modelName} exhausted after ${maxRetries} retries, trying next model...`)
          break
        }

        // Model permanently unavailable (404) → skip to next model silently
        if (isModelUnavailable(err)) {
          console.log(`[Gemini] ${modelName} unavailable (404), trying next model...`)
          break
        }

        throw err // genuine error (bad JSON, auth, etc.) → propagate
      }
    }
  }

  throw new Error(
    'Toate modelele Gemini sunt supraîncărcate. Încearcă din nou în câteva minute.'
  )
}

export async function generateMultilingualArticle(
  topic: string
): Promise<MultilingualArticle> {
  // Sequential to avoid hammering the API when it's already under load
  const roText = await generateWithRetry(PROMPTS.ro(topic))
  const ruText = await generateWithRetry(PROMPTS.ru(topic))
  const enText = await generateWithRetry(PROMPTS.en(topic))

  return {
    ro: parseArticle(roText),
    ru: parseArticle(ruText),
    en: parseArticle(enText),
  }
}
