"use client"

import { useState } from "react"
import { Share2, Check } from "lucide-react"
import { useTranslation } from "./i18n-provider"
import { cn } from "@/lib/utils"

export default function ShareButton({ className }: { className?: string }) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const onClick = async () => {
    if (typeof window === "undefined") return
    const url = window.location.href
    const title = document.title

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // user cancelled or share failed, fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available; nothing more we can do silently
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={copied ? t("share.copied") : t("share.aria")}
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-full border border-yellow-500/30 bg-black/40 text-gray-300 hover:text-yellow-400 hover:border-yellow-500/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400",
        className,
      )}
    >
      {copied ? (
        <Check aria-hidden="true" className="w-4 h-4 text-yellow-400" />
      ) : (
        <Share2 aria-hidden="true" className="w-4 h-4" />
      )}
    </button>
  )
}
