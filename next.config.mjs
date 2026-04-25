/** @type {import('next').NextConfig} */
const repo = 'Tool-Fibonacci'
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
