export interface UnsplashImage {
  url: string
  thumb: string
  alt: string
  photographer: string
  photographerUrl: string
}

export async function searchImages(
  query: string,
  count = 3
): Promise<UnsplashImage[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) throw new Error('UNSPLASH_ACCESS_KEY not configured')

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
    { headers: { Authorization: `Client-ID ${key}` } }
  )

  if (!res.ok) throw new Error(`Unsplash API error: ${res.status}`)

  const data = await res.json() as {
    results: Array<{
      urls: { regular: string; thumb: string }
      alt_description: string | null
      user: { name: string; links: { html: string } }
    }>
  }

  return data.results.map((photo) => ({
    url: photo.urls.regular,
    thumb: photo.urls.thumb,
    alt: photo.alt_description ?? query,
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
  }))
}
