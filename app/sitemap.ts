import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const siteUrl = 'https://dgonzamat.github.io/Tool-Fibonacci'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
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
  ]
}
