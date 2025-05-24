"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Sigma } from "lucide-react"

export default function NotFound() {
  const pathname = usePathname()

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname)
  }, [pathname])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="bg-gray-900/50 border-yellow-500/20 max-w-md w-full">
        <CardContent className="p-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Sigma className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-6xl font-light mb-4 text-yellow-500">404</h1>
          <h2 className="text-2xl font-light mb-4 text-white">Página no encontrada</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            La página que buscas no existe en nuestra secuencia. Como los números de Fibonacci, cada página tiene su
            lugar específico en nuestro patrón matemático.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                <Home className="w-4 h-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Página anterior
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              Ruta solicitada: <code className="text-yellow-500/70">{pathname}</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
