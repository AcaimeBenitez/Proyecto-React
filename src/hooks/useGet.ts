import { useEffect, useState } from "react"
import { api } from "../services/api"

export function useGet<T>(ruta: string) {
  const [datos, setDatos] = useState<T | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function cargar() {
      setCargando(true)
      setError("")
      try {
        const resultado = await api<T>(ruta, { signal: controller.signal })
        setDatos(resultado)
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return
        setError(e instanceof Error ? e.message : "Error al cargar los datos")
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    cargar()

    return () => controller.abort()
  }, [ruta])

  return { datos, cargando, error }
}