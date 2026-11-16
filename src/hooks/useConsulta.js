import { useEffect, useState } from 'react'
import { obtenerJson } from '../services/api.js'

// Caché de sesión para reutilizar respuestas exitosas.
const cache = new Map()

// Registro de solicitudes que todavía están en curso.
const solicitudesPendientes = new Map()

function obtenerSolicitud(url) {
  // Reutilizar una solicitud existente para la misma URL.
  const existente = solicitudesPendientes.get(url)

  if (existente) {
    if (existente.temporizador !== null) {
      clearTimeout(existente.temporizador)
      existente.temporizador = null
    }

    existente.consumidores += 1
    return existente
  }

  const controller = new AbortController()

  const solicitud = {
    controller,
    consumidores: 1,
    temporizador: null,
    promesa: null
  }

  solicitud.promesa = obtenerJson(url, {
    signal: controller.signal
  })
    .then((datos) => {
      if (!controller.signal.aborted) {
        cache.set(url, datos)
      }

      return datos
    })
    .finally(() => {
      if (solicitudesPendientes.get(url) === solicitud) {
        solicitudesPendientes.delete(url)
      }
    })

  solicitudesPendientes.set(url, solicitud)

  return solicitud
}

function liberarSolicitud(url, solicitud) {
  solicitud.consumidores = Math.max(
    0,
    solicitud.consumidores - 1
  )

  // No cancelar si todavía existen componentes interesados.
  if (solicitud.consumidores > 0) {
    return
  }

  // Permitir reutilizar la solicitud durante una
  // limpieza y nueva ejecución inmediata del efecto.
  solicitud.temporizador = setTimeout(() => {
    solicitud.temporizador = null

    if (solicitud.consumidores > 0) {
      return
    }

    solicitud.controller.abort()

    if (solicitudesPendientes.get(url) === solicitud) {
      solicitudesPendientes.delete(url)
    }
  }, 0)
}

export function useConsulta(url) {
  const [revision, setRevision] = useState(0)

  const [estado, setEstado] = useState(() => ({
    url,
    datos: cache.get(url) ?? null,
    cargando: !cache.has(url),
    error: ''
  }))

  useEffect(() => {
    let activo = true

    // Si existen datos en caché, no realizar otra petición.
    if (cache.has(url)) {
      return undefined
    }

    const solicitud = obtenerSolicitud(url)

    solicitud.promesa
      .then((datos) => {
        if (!activo || solicitud.controller.signal.aborted) {
          return
        }

        setEstado({
          url,
          datos,
          cargando: false,
          error: ''
        })
      })
      .catch((error) => {
        // Ignorar cancelaciones esperadas.
        if (!activo || solicitud.controller.signal.aborted) {
          return
        }

        setEstado({
          url,
          datos: null,
          cargando: false,
          error: error.message
        })
      })

    return () => {
      activo = false
      liberarSolicitud(url, solicitud)
    }
  }, [url, revision])

  // Evitar mostrar datos pertenecientes a otra URL.
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
    // Invalidar los datos anteriores para solicitar
    // una respuesta actualizada.
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