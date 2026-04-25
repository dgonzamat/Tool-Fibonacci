import { useEffect, useState } from "react"

export function useHideOnScroll(opts: { threshold?: number; minY?: number } = {}) {
  const { threshold = 8, minY = 80 } = opts
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = typeof window === "undefined" ? 0 : window.scrollY
    let raf = 0

    const update = () => {
      const y = window.scrollY
      if (y < minY) {
        setHidden(false)
      } else if (Math.abs(y - lastY) >= threshold) {
        setHidden(y > lastY)
      }
      lastY = y
      raf = 0
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [threshold, minY])

  return hidden
}
