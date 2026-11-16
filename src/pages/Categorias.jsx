import { Link } from 'react-router-dom'
import EstadoConsulta from '../components/EstadoConsulta.jsx'
import { useConsulta } from '../hooks/useConsulta.js'
export default function Categorias() {
  const { datos, cargando, error, reintentar } = useConsulta('/api/categorias')
  return <section><h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">Categorías de libros</h1><p className="mb-7 text-slate-600 dark:text-slate-300">Selecciona una categoría para consultar sus libros.</p><EstadoConsulta cargando={cargando} error={error} reintentar={reintentar}/>{datos && (datos.length ? <div className="grid gap-5 sm:grid-cols-2">{datos.map(categoria => <Link key={categoria.id} to={`/categorias/${categoria.id}`} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-500 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-400"><h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">{categoria.nombre}</h2><p className="mt-2 text-slate-600 dark:text-slate-300">{categoria.descripcion}</p><span className="mt-4 inline-block font-semibold text-indigo-700 dark:text-indigo-300">Ver libros →</span></Link>)}</div> : <p>No hay categorías disponibles.</p>)}</section>
}
