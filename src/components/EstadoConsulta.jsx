export default function EstadoConsulta({ cargando, error, reintentar }) {
  if (cargando) return <div role="status" aria-live="polite" className="rounded-xl bg-indigo-50 p-6 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">⏳ Cargando información, por favor espera...</div>
  if (error) return <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"><p className="font-semibold">No pudimos cargar los datos.</p><p className="mt-2">{error}</p><button type="button" onClick={reintentar} className="mt-4 rounded-lg bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800">Reintentar</button></div>
  return null
}
