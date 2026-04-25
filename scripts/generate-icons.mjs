import { ImageResponse } from "next/dist/server/og/image-response.js"
import { writeFileSync, mkdirSync } from "node:fs"
import { createElement as h } from "react"

mkdirSync("public", { recursive: true })

function icon(size) {
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
      },
    },
    h(
      "div",
      {
        style: {
          width: Math.floor(size * 0.78),
          height: Math.floor(size * 0.78),
          borderRadius: 9999,
          backgroundColor: "#eab308",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000000",
          fontSize: Math.floor(size * 0.55),
          fontWeight: 800,
          lineHeight: 1,
        },
      },
      "φ",
    ),
  )
}

async function gen(size, filename) {
  const response = new ImageResponse(icon(size), { width: size, height: size })
  const buffer = await response.arrayBuffer()
  writeFileSync(filename, Buffer.from(buffer))
  console.log(`Generated ${filename} (${buffer.byteLength} bytes)`)
}

await gen(192, "public/icon-192.png")
await gen(512, "public/icon-512.png")
await gen(180, "public/apple-icon.png")
await gen(32, "public/favicon-32.png")
