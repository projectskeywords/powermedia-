import { NextResponse } from 'next/server'
import { getAllArticles, updateArticle } from '@/lib/articles-db'
import { searchImages } from '@/lib/unsplash'

// One-time endpoint to add images to articles that have empty images array
// Call: POST /api/articles/fix-images
export async function POST() {
  try {
    const articles = getAllArticles()
    const fixed: string[] = []

    for (const article of articles) {
      if (!article.images || article.images.length === 0) {
        const query = article.ro.imageQuery || article.ro.title
        const images = await searchImages(query, 3).catch(() => [])

        if (images.length > 0) {
          updateArticle(article.id, { images })
          fixed.push(article.id)
        }
      }
    }

    return NextResponse.json({ success: true, fixed: fixed.length, ids: fixed })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
