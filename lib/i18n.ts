export const es = {
  "skip.link": "Saltar al contenido",
  "nav.music": "Análisis Musical",
  "nav.fibonacci": "Fibonacci",
  "nav.education": "Educación",
  "header.formula": "F(n) = F(n-1) + F(n-2)",
  "hero.subtitle":
    "Explorando los patrones matemáticos y las proporciones áureas en la música de Tool",
  "sections.fibonacci.title": "Visualizador de Fibonacci",
  "sections.fibonacci.subtitle":
    "Visualización interactiva de la secuencia de Fibonacci y la proporción áurea",
  "sections.music.title": "Análisis Musical",
  "sections.music.subtitle":
    "Explora cómo Tool incorpora patrones matemáticos en sus composiciones",
  "sections.education.title": "Fundamentos Matemáticos",
  "sections.education.subtitle":
    "Entendiendo las secuencias de Fibonacci y la proporción áurea en la música",
  "footer.nav": "Navegación",
  "footer.resources": "Recursos",
  "footer.tagline":
    "Explorando los patrones matemáticos en la música de Tool, enfocándose en las secuencias de Fibonacci y las proporciones de la razón áurea a través de visualizaciones recursivas e interactivas.",
  "footer.link.music": "Análisis Musical",
  "footer.link.fibonacci": "Patrones Fibonacci",
  "footer.link.education": "Recursos Educativos",
  "footer.copyright":
    "© 2024 Tool Fibonacci Project. Todos los derechos reservados.",
  "footer.created": "Creado con",
  "footer.created.suffix": "para entusiastas de las matemáticas y la música",
  "lang.label.es": "Español",
  "lang.label.en": "English",
  "lang.toggle.aria": "Cambiar idioma",
} as const

export type DictKey = keyof typeof es

export const en: Record<DictKey, string> = {
  "skip.link": "Skip to content",
  "nav.music": "Music Analysis",
  "nav.fibonacci": "Fibonacci",
  "nav.education": "Education",
  "header.formula": "F(n) = F(n-1) + F(n-2)",
  "hero.subtitle":
    "Exploring mathematical patterns and golden ratio proportions in the music of Tool",
  "sections.fibonacci.title": "Fibonacci Visualizer",
  "sections.fibonacci.subtitle":
    "Interactive visualization of the Fibonacci sequence and the golden ratio",
  "sections.music.title": "Music Analysis",
  "sections.music.subtitle":
    "Explore how Tool weaves mathematical patterns into their compositions",
  "sections.education.title": "Mathematical Foundations",
  "sections.education.subtitle":
    "Understanding Fibonacci sequences and the golden ratio in music",
  "footer.nav": "Navigation",
  "footer.resources": "Resources",
  "footer.tagline":
    "Exploring the mathematical patterns in Tool's music, focusing on Fibonacci sequences and golden-ratio proportions through recursive, interactive visualizations.",
  "footer.link.music": "Music Analysis",
  "footer.link.fibonacci": "Fibonacci Patterns",
  "footer.link.education": "Educational Resources",
  "footer.copyright": "© 2024 Tool Fibonacci Project. All rights reserved.",
  "footer.created": "Made with",
  "footer.created.suffix": "for math and music enthusiasts",
  "lang.label.es": "Español",
  "lang.label.en": "English",
  "lang.toggle.aria": "Switch language",
}

export type Lang = "es" | "en"

export const dictionaries = { es, en } as const
