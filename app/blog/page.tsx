import type { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { posts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Análisis profundos sobre los patrones matemáticos y la proporción áurea en la música de Tool.",
  alternates: { canonical: "/blog" },
}

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-10 sm:mb-14 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 tracking-wider">
          Blog
        </h1>
        <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">
          Análisis profundos de los patrones matemáticos en la obra de Tool.
        </p>
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
      </header>

      <ul className="space-y-6 sm:space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="group rounded-2xl border border-gray-800 hover:border-yellow-500/40 bg-gray-900/40 transition-colors p-5 sm:p-7">
              <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400 mb-3">
                <span className="inline-flex items-center gap-1">
                  <Calendar aria-hidden="true" className="w-3.5 h-3.5" />
                  <time dateTime={post.date}>{post.date}</time>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock aria-hidden="true" className="w-3.5 h-3.5" />
                  {post.readingTime}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-yellow-500/30 text-yellow-400">
                  {post.tag}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-yellow-400 transition-colors mb-2">
                <Link
                  href={`/blog/${post.slug}/`}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                {post.description}
              </p>
              <Link
                href={`/blog/${post.slug}/`}
                className="inline-flex items-center gap-1.5 text-sm text-yellow-400 hover:text-yellow-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
              >
                Leer
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
