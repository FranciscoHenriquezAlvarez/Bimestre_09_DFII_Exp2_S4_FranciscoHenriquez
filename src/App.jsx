import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Inicio from './pages/Inicio.jsx'
import Categorias from './pages/Categorias.jsx'
import Libros from './pages/Libros.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import Contacto from './pages/Contacto.jsx'

function AppLayout() {
  const [oscuro, setOscuro] = useState(() => {
    try {
      return localStorage.getItem('libreria-tema') === 'oscuro'
    } catch {
      return false
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', oscuro)

    try {
      localStorage.setItem(
        'libreria-tema',
        oscuro ? 'oscuro' : 'claro'
      )
    } catch {
      /* Almacenamiento no disponible */
    }

    return () => {
      document.documentElement.classList.remove('dark')
    }
  }, [oscuro])

  const navClass = ({ isActive }) =>
    isActive
      ? 'font-bold underline underline-offset-4'
      : 'hover:underline'

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">

      {/* ENCABEZADO */}
      <header className="bg-indigo-800 text-white shadow dark:bg-indigo-950">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">

          <Link to="/" className="text-2xl font-bold">
            📚 Librería Virtual
          </Link>

          <nav
            aria-label="Navegación principal"
            className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm sm:text-base"
          >
            <NavLink to="/" end className={navClass}>
              Inicio
            </NavLink>

            <NavLink to="/categorias" className={navClass}>
              Categorías
            </NavLink>

            <NavLink to="/quienes-somos" className={navClass}>
              Quiénes somos
            </NavLink>

            <NavLink to="/contacto" className={navClass}>
              Contacto
            </NavLink>

            {/* BOTÓN MODO CLARO / OSCURO */}
            <button
              type="button"
              aria-label={
                oscuro
                  ? 'Activar modo claro'
                  : 'Activar modo oscuro'
              }
              aria-pressed={oscuro}
              title={
                oscuro
                  ? 'Activar modo claro'
                  : 'Activar modo oscuro'
              }
              onClick={() => setOscuro(v => !v)}
              className="rounded-lg border border-white/50 px-3 py-2 text-xl hover:bg-white/15"
            >
              {oscuro ? '☀️' : '🌙'}
            </button>

          </nav>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <Routes>
          <Route
            path="/"
            element={<Inicio />}
          />

          <Route
            path="/categorias"
            element={<Categorias />}
          />

          <Route
            path="/categorias/:categoriaId"
            element={<Libros />}
          />

          <Route
            path="/quienes-somos"
            element={<QuienesSomos />}
          />

          <Route
            path="/contacto"
            element={<Contacto />}
          />

          <Route
            path="*"
            element={
              <section>
                <h1 className="text-3xl font-bold">
                  Página no encontrada
                </h1>

                <p className="my-4">
                  La dirección ingresada no existe.
                </p>

                <Link
                  to="/"
                  className="font-semibold text-indigo-700 hover:underline dark:text-indigo-300"
                >
                  Volver al inicio
                </Link>
              </section>
            }
          />
        </Routes>
      </main>

      {/* PIE DE PÁGINA */}
      <footer className="bg-indigo-800 py-5 text-center text-white shadow dark:bg-indigo-950">
        <p className="text-base font-semibold">
          Librería Virtual
        </p>
      </footer>

    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}