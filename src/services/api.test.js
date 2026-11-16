import { afterEach, describe, expect, it, vi } from 'vitest'
import { obtenerJson } from './api.js'
afterEach(() => vi.unstubAllGlobals())
describe('cliente REST', () => {
  it('devuelve los datos de una respuesta exitosa', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => [{ id: 1 }] }))
    await expect(obtenerJson('/api/categorias')).resolves.toEqual([{ id: 1 }])
  })
  it('informa el error 404', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }))
    await expect(obtenerJson('/api/inexistente')).rejects.toThrow('404')
  })
  it('informa el error 500', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    await expect(obtenerJson('/api/categorias')).rejects.toThrow('500')
  })
  it('informa problemas de conexión', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    await expect(obtenerJson('/api/categorias')).rejects.toThrow('conectar')
  })
})
