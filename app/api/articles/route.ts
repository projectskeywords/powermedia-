import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles-db'

export async function GET() {
  try {
    const articles = await getAllArticles()
    return NextResponse.json({ articles })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
