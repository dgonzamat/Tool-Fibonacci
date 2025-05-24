"use client"

import { useState } from "react"
import { Sigma, BookOpen, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const generateFibonacciSequence = (n: number): number[] => {
  const sequence: number[] = [0, 1]
  if (n <= 1) return sequence.slice(0, n + 1)

  for (let i = 2; i <= n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2])
  }

  return sequence
}

export default function EducationalSection() {
  const [activeTab, setActiveTab] = useState("sequence")
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  const sequence = generateFibonacciSequence(15)
  const goldenRatio = (1 + Math.sqrt(5)) / 2

  const topics = [
    {
      id: "sequence",
      title: "La Secuencia de Fibonacci",
      icon: <Sigma className="w-5 h-5" />,
      description: "Aprende sobre la secuencia matemática y sus propiedades",
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">
            La secuencia de Fibonacci es una serie de números donde cada número es la suma de los dos anteriores,
            generalmente comenzando con 0 y 1. La secuencia comienza:
          </p>

          <div className="flex flex-wrap items-center justify-center p-4 bg-gray-800/50 rounded-md gap-2 border border-gray-700">
            {sequence.slice(0, 12).map((num, index) => (
              <div
                key={index}
                className={cn(
                  "px-3 py-2 rounded-md transition-all duration-300 text-center min-w-[50px] font-mono",
                  index % 2 === 0
                    ? "bg-gray-700 text-gray-300"
                    : "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30",
                )}
              >
                {num}
              </div>
            ))}
          </div>

          <p className="text-gray-300 leading-relaxed">
            Esta secuencia aparece en toda la naturaleza, el arte, la arquitectura y la música. En la música de Tool, la
            secuencia de Fibonacci influye en los patrones rítmicos, compases e incluso en la estructura lírica.
          </p>

          <div className="bg-gray-800/30 p-4 rounded-md border border-gray-700">
            <h4 className="text-lg text-yellow-500 mb-2">Fórmula Matemática</h4>
            <p className="text-gray-300 mb-3">La secuencia de Fibonacci puede expresarse matemáticamente como:</p>
            <div className="p-3 text-center font-mono bg-gray-900/50 rounded border border-gray-600">
              <div className="text-yellow-500">F(0) = 0, F(1) = 1</div>
              <div className="text-yellow-500 mt-1">F(n) = F(n-1) + F(n-2) para n &gt; 1</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "golden-ratio",
      title: "La Proporción Áurea",
      icon: <Sigma className="w-5 h-5" />,
      description: "Entiende la proporción divina y su relación con Fibonacci",
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">
            La proporción áurea (aproximadamente 1.618...) es un número irracional representado por la letra griega phi
            (φ). Cuando se visualiza, crea proporciones estéticamente agradables que aparecen en el arte y la
            naturaleza.
          </p>

          <div className="bg-gray-800 p-4 rounded-md text-center border border-gray-700">
            <span className="text-xl font-mono text-yellow-500">φ = (1 + √5)/2 ≈ {goldenRatio.toFixed(8)}...</span>
          </div>

          <p className="text-gray-300 leading-relaxed">
            A medida que progresa la secuencia de Fibonacci, la proporción entre números consecutivos se acerca a la
            proporción áurea. Esta relación es clave para entender cómo Tool incorpora estos conceptos matemáticos en su
            música.
          </p>

          <div className="bg-gray-800/30 p-4 rounded-md border border-gray-700">
            <h4 className="text-lg text-yellow-500 mb-3">Proporción Áurea en la Música</h4>
            <p className="text-gray-300 mb-4">
              En música, la proporción áurea puede usarse para determinar momentos clave para transiciones, clímax o
              cambios temáticos. Para una canción de duración L, el punto de proporción áurea estaría aproximadamente en
              L/φ desde el final, o 0.618 × L desde el principio.
            </p>

            <div className="relative h-8 bg-gray-700 rounded-md overflow-hidden">
              <div
                className="absolute h-full bg-yellow-500/30 transition-all duration-1000"
                style={{ width: "61.8%" }}
              />
              <div className="absolute h-full border-l-2 border-yellow-500" style={{ left: "61.8%" }} />
              <div className="absolute inset-0 flex items-center px-3 justify-between text-xs text-white">
                <span>0%</span>
                <span className="absolute left-[61.8%] transform -translate-x-1/2 text-yellow-500 font-bold">
                  61.8%
                </span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const faqs = [
    {
      id: "faq-1",
      question: "¿Tool usó intencionalmente Fibonacci en su música?",
      answer:
        "Sí, Tool ha confirmado en entrevistas que incorporan deliberadamente conceptos matemáticos en sus composiciones. Maynard James Keenan y Adam Jones han mencionado específicamente la secuencia de Fibonacci y la proporción áurea como inspiraciones para su trabajo, especialmente en el álbum Lateralus.",
    },
    {
      id: "faq-2",
      question: "¿Cómo puedo identificar patrones Fibonacci en la música?",
      answer:
        "Escucha compases que usen números Fibonacci (1, 2, 3, 5, 8, 13), patrones rítmicos que sigan estas proporciones, y transiciones clave que ocurran en puntos de proporción áurea en la duración de la canción. En la música de Tool, estos patrones se encuentran a menudo en patrones de batería, riffs de guitarra y estructuras de canciones.",
    },
    {
      id: "faq-3",
      question: "¿Hay otras bandas que usen conceptos matemáticos?",
      answer:
        "Sí, muchas bandas progresivas y experimentales incorporan patrones matemáticos. Ejemplos incluyen Meshuggah (polirritmias complejas), Animals as Leaders (patrones geométricos), King Crimson (compases matemáticos), y Radiohead (proporción áurea en estructuras de canciones). Compositores clásicos como Bach y Mozart también usaron principios matemáticos extensivamente.",
    },
  ]

  const activeTopic = topics.find((topic) => topic.id === activeTab)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <h3 className="text-xl text-yellow-500 mb-4">Conceptos Matemáticos</h3>

        <div className="space-y-3">
          {topics.map((topic) => (
            <Button
              key={topic.id}
              variant="ghost"
              className={cn(
                "w-full justify-start p-4 h-auto text-left",
                activeTab === topic.id
                  ? "bg-yellow-500/20 border border-yellow-500/50"
                  : "border border-gray-700 hover:border-yellow-500/30 hover:bg-yellow-500/5",
              )}
              onClick={() => setActiveTab(topic.id)}
            >
              <div className="flex items-center space-x-3 w-full">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    activeTab === topic.id ? "bg-yellow-500 text-black" : "bg-gray-700 text-gray-300",
                  )}
                >
                  {topic.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className={cn("font-medium", activeTab === topic.id ? "text-yellow-500" : "text-white")}>
                    {topic.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{topic.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-8 bg-gray-900/50 p-4 rounded-md border border-gray-700">
          <h4 className="text-white mb-3 font-medium">Recursos Adicionales</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors group text-sm"
              >
                <BookOpen className="w-4 h-4 mr-2 text-gray-500 group-hover:text-yellow-500" />
                <span>Guía de Teoría Musical</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors group text-sm"
              >
                <BookOpen className="w-4 h-4 mr-2 text-gray-500 group-hover:text-yellow-500" />
                <span>Matemáticas del Ritmo</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors group text-sm"
              >
                <BookOpen className="w-4 h-4 mr-2 text-gray-500 group-hover:text-yellow-500" />
                <span>Filosofía Musical de Tool</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:col-span-2">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center">
              {activeTopic?.icon && (
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3 text-black">
                  {activeTopic.icon}
                </div>
              )}
              <CardTitle className="text-white">{activeTopic?.title}</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            {activeTopic?.content}

            <div className="mt-8 pt-6 border-t border-gray-700">
              <h4 className="text-lg text-yellow-500 mb-4">Preguntas Frecuentes</h4>

              <div className="space-y-3">
                {faqs.map((faq) => (
                  <Card key={faq.id} className="bg-gray-800/50 border-gray-600">
                    <CardContent className="p-0">
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-4 h-auto text-left"
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      >
                        <span className="font-medium text-white pr-4">{faq.question}</span>
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 transition-transform duration-300 flex-shrink-0",
                            expandedFaq === faq.id && "transform rotate-180",
                          )}
                        />
                      </Button>

                      {expandedFaq === faq.id && (
                        <div className="p-4 pt-0 border-t border-gray-600 text-sm text-gray-300 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-gray-900/50 rounded-md flex items-center justify-between border border-gray-700">
          <div className="flex items-center">
            <BookOpen className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-gray-300">¿Quieres aprender más sobre las matemáticas de la música?</span>
          </div>
          <Button variant="outline" size="sm" className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10">
            Explorar recursos
          </Button>
        </div>
      </div>
    </div>
  )
}
