import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const basePath = process.env.NODE_ENV === "production" ? "/Tool-Fibonacci" : ""

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tool × Fibonacci",
    short_name: "Tool Fibonacci",
    description:
      "Patrones matemáticos y proporción áurea en la música de Tool. Análisis interactivo de Lateralus, Schism y Forty Six & 2.",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    orientation: "portrait",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "es",
    categories: ["music", "education", "entertainment"],
    icons: [
      {
        src: `${basePath}/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
