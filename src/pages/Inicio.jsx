import { Link } from 'react-router-dom'
export default function Inicio() {
  return <section className="rounded-2xl bg-gradient-to-br from-indigo-700 to-violet-700 px-7 py-16 text-center text-white shadow-lg dark:from-indigo-950 dark:to-violet-950"><div className="mb-5 text-6xl" aria-hidden="true">📚</div><h1 className="text-4xl font-bold">Bienvenido a Librería Virtual</h1><p className="mx-auto mt-5 max-w-xl text-lg text-indigo-100">Explora nuestras categorías y descubre nuevas historias. Encuentra tu próxima lectura favorita en nuestra Librería Virtual.</p><Link to="/categorias" className="mt-8 inline-block rounded-xl bg-white px-7 py-3 font-bold text-indigo-700 hover:bg-indigo-100">Explorar categorías →</Link></section>
}
