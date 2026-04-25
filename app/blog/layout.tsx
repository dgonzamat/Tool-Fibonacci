import type { ReactNode } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main id="main" className="pt-20 sm:pt-24">
        <div className="container mx-auto py-8 sm:py-12">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
