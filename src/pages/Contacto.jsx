import { useState } from 'react'
const inicial = { nombre: '', correo: '', asunto: '', mensaje: '' }
export default function Contacto() {
  const [form, setForm] = useState(inicial)
  const [errores, setErrores] = useState({})
  const [confirmado, setConfirmado] = useState(false)
  const cambiar = e => { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); setErrores(prev => ({ ...prev, [e.target.name]: '' })); setConfirmado(false) }
  const enviar = e => {
    e.preventDefault()
    const nuevos = {}
    if (!form.nombre.trim()) nuevos.nombre = 'Ingresa tu nombre.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo.trim())) nuevos.correo = 'Ingresa un correo electrónico válido.'
    if (!form.asunto.trim()) nuevos.asunto = 'Ingresa un asunto.'
    if (!form.mensaje.trim()) nuevos.mensaje = 'Escribe tu mensaje.'
    setErrores(nuevos)
    if (Object.keys(nuevos).length === 0) { setConfirmado(true); setForm(inicial) }
  }
  const campos = [{ nombre: 'nombre', etiqueta: 'Nombre', tipo: 'text' }, { nombre: 'correo', etiqueta: 'Correo electrónico', tipo: 'email' }, { nombre: 'asunto', etiqueta: 'Asunto', tipo: 'text' }, { nombre: 'mensaje', etiqueta: 'Mensaje', tipo: 'textarea' }]
  return <section className="mx-auto max-w-2xl"><h1 className="mb-3 text-3xl font-bold text-indigo-800 dark:text-indigo-300">Contacto</h1><p className="mb-6 text-slate-600 dark:text-slate-300">¿Tienes alguna consulta? Completa el formulario para preparar tu mensaje.</p><form onSubmit={enviar} noValidate className="space-y-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-700 dark:bg-slate-900">{campos.map(c => <div key={c.nombre}><label htmlFor={c.nombre} className="mb-2 block font-semibold">{c.etiqueta}</label>{c.tipo === 'textarea' ? <textarea id={c.nombre} name={c.nombre} value={form[c.nombre]} onChange={cambiar} rows="5" aria-invalid={!!errores[c.nombre]} aria-describedby={errores[c.nombre] ? `${c.nombre}-error` : undefined} className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white" /> : <input id={c.nombre} name={c.nombre} type={c.tipo} value={form[c.nombre]} onChange={cambiar} aria-invalid={!!errores[c.nombre]} aria-describedby={errores[c.nombre] ? `${c.nombre}-error` : undefined} className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white" />}{errores[c.nombre] && <p id={`${c.nombre}-error`} className="mt-1 text-sm text-red-700 dark:text-red-300">{errores[c.nombre]}</p>}</div>)}<button type="submit" className="rounded-lg bg-indigo-700 px-6 py-3 font-semibold text-white hover:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-600">Enviar mensaje</button>{confirmado && <p role="status" className="rounded-lg bg-green-50 p-4 text-green-900 dark:bg-green-950 dark:text-green-200">Formulario validado correctamente. Esta demostración no envía mensajes reales.</p>}<p className="text-sm text-slate-500 dark:text-slate-400">Formulario de demostración: no se almacenan ni envían los datos.</p></form></section>
}
