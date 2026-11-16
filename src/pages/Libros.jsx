import { Link, useParams } from 'react-router-dom'
import EstadoConsulta from '../components/EstadoConsulta.jsx'
import { useConsulta } from '../hooks/useConsulta.js'
const moneda = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
export default function Libros() {
  const { categoriaId } = useParams()
  const nombresCategorias = {
    ficcion: 'Ficción',
    'ciencia-ficcion': 'Ciencia ficción',
    misterio: 'Misterio',
    drama: 'Drama',
  }
  const nombreCategoria = nombresCategorias[categoriaId] ?? categoriaId.replaceAll('-', ' ')
  const { datos, cargando, error, reintentar } = useConsulta(`/api/categorias/${encodeURIComponent(categoriaId)}/libros`)
  return <section><Link to="/categorias" className="font-semibold text-indigo-700 hover:underline dark:text-indigo-300">← Volver a categorías</Link><h1 className="mb-2 mt-6 text-3xl font-bold">Libros: {nombreCategoria}</h1><p className="mb-7 text-slate-600 dark:text-slate-300">Explora los títulos disponibles en esta categoría.</p><EstadoConsulta cargando={cargando} error={error} reintentar={reintentar}/>{datos && (datos.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{datos.map(libro => <article key={libro.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"><div aria-hidden="true" className="mb-4 text-4xl">📖</div><h2 className="text-xl font-bold text-slate-900 dark:text-white">{libro.titulo}</h2><p className="mt-2 text-slate-600 dark:text-slate-300">{libro.autor}</p><p className="mt-4 font-bold text-indigo-700 dark:text-indigo-300">{moneda.format(libro.precio)}</p></article>)}</div> : <p className="rounded-xl bg-amber-50 p-6 text-amber-900 dark:bg-amber-950 dark:text-amber-100">Esta categoría aún no tiene libros disponibles. Puedes explorar otra categoría.</p>)}</section>
}
