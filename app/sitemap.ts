import type { MetadataRoute } from 'next'
import { SITE_URL, featured } from '@/lib/content'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    ...featured.map(f => ({ url: `${SITE_URL}/projects/${f.slug}/`, priority: 0.8 })),
  ]
}
