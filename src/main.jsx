import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'

// Activar MSW solamente durante el desarrollo.
async function enableMocking() {
  if (!import.meta.env.DEV) {
    return
  }

  const { worker } = await import('./mocks/browser.js')

  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
}

// Iniciar la aplicación después de configurar MSW.
async function iniciarAplicacion() {
  try {
    await enableMocking()

    ReactDOM.createRoot(
      document.getElementById('root')
    ).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  } catch (error) {
    console.error(
      'No fue posible iniciar la aplicación:',
      error
    )

    document.getElementById('root').textContent =
      'No se pudo iniciar la Librería Virtual. Recarga la página.'
  }
}

iniciarAplicacion()