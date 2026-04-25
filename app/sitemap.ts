import type { MetadataRoute } from 'next'
import { posts } from '@/lib/posts'

export const dynamic = 'force-static'

const siteUrl = 'https://dgonzamat.github.io/Tool-Fibonacci'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/#fibonacci`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#music`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#education`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blog/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...baseEntries, ...postEntries]
}
