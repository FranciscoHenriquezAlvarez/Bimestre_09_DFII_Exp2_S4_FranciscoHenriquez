import { http, HttpResponse, delay } from 'msw'
import { categorias, libros } from './data.js'

export const handlers = [
  http.get('/api/categorias', async ({ request }) => {
    await delay(450)
    if (new URL(request.url).searchParams.get('error') === '500') {
      return HttpResponse.json({ mensaje: 'Error simulado del servidor.' }, { status: 500 })
    }
    return HttpResponse.json(categorias)
  }),
  http.get('/api/categorias/:id/libros', async ({ params, request }) => {
    await delay(550)
    if (new URL(request.url).searchParams.get('error') === '500') {
      return HttpResponse.json({ mensaje: 'Error simulado del servidor.' }, { status: 500 })
    }
    if (!categorias.some((categoria) => categoria.id === params.id)) {
      return HttpResponse.json({ mensaje: 'La categoría solicitada no existe.' }, { status: 404 })
    }
    return HttpResponse.json(libros.filter((libro) => libro.categoriaId === params.id))
  }),
]
