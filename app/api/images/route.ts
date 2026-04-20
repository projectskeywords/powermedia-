import { NextRequest, NextResponse } from 'next/server'
import { searchImages } from '@/lib/unsplash'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q')
  const count = Number(req.nextUrl.searchParams.get('count') ?? 3)

  if (!query) {
    return NextResponse.json({ error: 'q parameter required' }, { status: 400 })
  }

  try {
    const images = await searchImages(query, Math.min(count, 10))
    return NextResponse.json({ images })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
