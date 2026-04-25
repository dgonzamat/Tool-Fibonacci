import { useEffect, useState } from "react"

export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActive(visible[0].target.id)
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0.05, 0.25, 0.5, 0.75],
      },
    )

    const elements: Element[] = []
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
        elements.push(el)
      }
    }
    return () => observer.disconnect()
  }, [ids.join(",")])

  return active
}
