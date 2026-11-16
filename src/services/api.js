export async function obtenerJson(url, { signal } = {}) {
  let respuesta
  try {
    respuesta = await fetch(url, { signal })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('No se pudo conectar con el servidor. Revisa la conexión y vuelve a intentar.')
  }
  if (!respuesta.ok) {
    if (respuesta.status === 404) throw new Error('No se encontró la categoría solicitada (404).')
    if (respuesta.status >= 500) throw new Error('El servidor presenta un problema (500). Intenta nuevamente.')
    throw new Error(`No se pudo completar la solicitud (${respuesta.status}).`)
  }
  return respuesta.json()
}
export const obtenerCategorias = (opciones) => obtenerJson('/api/categorias', opciones)
export const obtenerLibros = (id, opciones) => obtenerJson(`/api/categorias/${encodeURIComponent(id)}/libros`, opciones)
