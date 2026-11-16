# Librería Virtual — Semana 04 | Desarrollo Frontend II (PFY2202)

Aplicación React + Vite para explorar categorías y libros mediante una API REST **mock** implementada con Mock Service Worker (MSW). Los datos son ficticios y no existe un servidor backend real.

## Requisitos
- Node.js compatible con Vite 7 (Node 20.19+ o 22.12+).
- npm.

## Instalación
```bash
npm install
npx msw init public --save
npm run dev
```
**Importante:** `npx msw init public --save` genera `public/mockServiceWorker.js`. Es obligatorio antes de abrir la aplicación. Si no se genera, MSW no podrá iniciar.

## Comprobaciones
```bash
npm run lint
npm run test
npm run build
```

## Funcionalidades
- Navegación con `react-router` y `react-router-dom` instalados; enlaces y rutas dinámicas.
- `GET /api/categorias` obtiene las categorías desde MSW.
- `GET /api/categorias/:id/libros` obtiene los libros de una categoría.
- Respuesta 404 para categorías inexistentes; respuesta 500 simulable.
- Mensajes de carga, error y reintento; mensaje para categorías sin libros.
- Caché en memoria por URL para evitar solicitudes repetidas al volver a una vista; cancelación de solicitudes con AbortController.
- Tailwind CSS 4 y diseño adaptable.

## Cómo probar errores
- Navegar a `/categorias/no-existe` para observar un error HTTP 404 y el botón de reintento.
- Para simular un 500 en MSW, agregar `?error=500` a una solicitud de `/api/categorias` o `/api/categorias/:id/libros` desde las herramientas de desarrollo del navegador. Las pantallas normales no agregan ese parámetro.
- Para verificar el indicador de carga, abrir una categoría por primera vez; MSW incorpora un retardo simulado.
- Para comprobar que no se repiten consultas, abrir la pestaña Network, visitar una categoría y volver a ella: los datos ya consultados se obtienen de la caché de memoria.

## Estructura
- `src/mocks/`: handlers REST y datos ficticios.
- `src/services/`: cliente Fetch y tratamiento de errores HTTP.
- `src/hooks/`: caché y gestión de estados de consulta.
- `src/components/`: indicador de carga y errores.
- `src/pages/`: pantallas de inicio, categorías y libros.

## Entrega
Subir el código a GitHub **sin** `node_modules` ni `dist`. Conservar el archivo generado `public/mockServiceWorker.js` para que el sitio funcione después de desplegarlo.

## Mejoras de interfaz

- Navegación a Inicio, Categorías, Quiénes somos y Contacto.
- Modo claro/oscuro global con preferencia conservada en `localStorage`.
- Formulario de contacto con validaciones por campo; es una demostración local, **no envía ni almacena mensajes**.
- No se muestra pie de página académico ni detalles técnicos en el texto de bienvenida.
