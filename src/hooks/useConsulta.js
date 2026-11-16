import { useEffect, useState } from 'react'
import { obtenerJson } from '../services/api.js'

// Caché de sesión en memoria para evitar solicitudes innecesarias.
const cache = new Map()

export function useConsulta(url) {
  const [revision, setRevision] = useState(0)

  const [estado, setEstado] = useState(() => ({
    url,
    datos: cache.get(url) ?? null,
    cargando: !cache.has(url),
    error: ''
  }))

  useEffect(() => {
    const controller = new AbortController()

    // Utilizar los datos almacenados si están disponibles.
    if (cache.has(url)) {
      return undefined
    }

    obtenerJson(url, { signal: controller.signal })
      .then((datos) => {
        if (controller.signal.aborted) return

        cache.set(url, datos)

        setEstado({
          url,
          datos,
          cargando: false,
          error: ''
        })
      })
      .catch((error) => {
        // Ignorar las cancelaciones esperadas.
        if (controller.signal.aborted) return

        setEstado({
          url,
          datos: null,
          cargando: false,
          error: error.message
        })
      })

    return () => {
      controller.abort()
    }
  }, [url, revision])

  // Evitar mostrar datos correspondientes a otra categoría.
  const actual = cache.has(url)
    ? {
        datos: cache.get(url),
        cargando: false,
        error: ''
      }
    : estado.url === url
      ? {
          datos: estado.datos,
          cargando: estado.cargando,
          error: estado.error
        }
      : {
          datos: null,
          cargando: true,
          error: ''
        }

  const reintentar = () => {
    cache.delete(url)

    setEstado({
      url,
      datos: null,
      cargando: true,
      error: ''
    })

    setRevision((valor) => valor + 1)
  }

  return {
    ...actual,
    reintentar
  }
}