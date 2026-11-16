# 📚 Librería Virtual

Aplicación web desarrollada con **React y Vite** que permite explorar categorías literarias y consultar libros mediante una interfaz intuitiva y adaptable a diferentes dispositivos.

El proyecto utiliza una API REST simulada mediante **Mock Service Worker (MSW)**, que permite realizar solicitudes HTTP y gestionar sus respuestas sin necesidad de disponer de un servidor backend.

## Características principales

- Exploración de categorías literarias.
- Visualización de libros organizados por categoría.
- Navegación entre páginas mediante React Router.
- Consultas HTTP utilizando la API Fetch.
- Simulación de servicios REST mediante Mock Service Worker.
- Gestión de estados de carga, error y ausencia de resultados.
- Manejo de errores HTTP y posibilidad de reintentar consultas.
- Optimización de solicitudes mediante caché en memoria.
- Cancelación de solicitudes mediante AbortController.
- Diseño adaptable a dispositivos móviles, tabletas y computadores.
- Modo claro y oscuro con persistencia de preferencias.
- Formulario de contacto con validación de campos.

## Tecnologías utilizadas

- **React:** desarrollo de componentes e interfaces de usuario.
- **Vite:** entorno de desarrollo y compilación.
- **JavaScript:** lógica y funcionalidades de la aplicación.
- **React Router:** navegación y gestión de rutas.
- **Tailwind CSS 4:** estilos y diseño adaptable.
- **Mock Service Worker (MSW):** simulación de respuestas de una API REST.
- **Fetch API:** realización de solicitudes HTTP.
- **LocalStorage:** almacenamiento de preferencias de visualización.

## Requisitos previos

Para ejecutar el proyecto es necesario contar con:

- Node.js 20.19 o superior, o una versión compatible de la rama 22.12 en adelante.
- npm.

## Instalación y ejecución

**1. Clonar el repositorio**

```bash
git clone https://github.com/FranciscoHenriquezAlvarez/Bimestre_09_DFII_Exp2_S4_FranciscoHenriquez.git
```

**2. Acceder al directorio del proyecto**

```bash
cd Bimestre_09_DFII_Exp2_S4_FranciscoHenriquez
```

**3. Instalar las dependencias**

```bash
npm install
```

**4. Iniciar el entorno de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en la dirección local indicada por Vite.

El proyecto incluye el archivo `public/mockServiceWorker.js`, necesario para el funcionamiento de Mock Service Worker.

## Estructura del proyecto

```text
src/
├── components/
├── hooks/
├── mocks/
│   ├── browser.js
│   ├── data.js
│   └── handlers.js
├── pages/
│   ├── Inicio.jsx
│   ├── Categorias.jsx
│   ├── Libros.jsx
│   ├── QuienesSomos.jsx
│   └── Contacto.jsx
├── services/
│   ├── api.js
│   └── api.test.js
├── App.jsx
├── index.css
└── main.jsx
```

### Organización

- **components:** componentes reutilizables de la interfaz.
- **hooks:** lógica reutilizable para consultas y gestión de estados.
- **mocks:** configuración, datos y controladores de la API simulada.
- **pages:** componentes correspondientes a las distintas páginas.
- **services:** funciones de comunicación con la API y pruebas asociadas.
- **App.jsx:** configuración general de la aplicación y sus rutas.
- **index.css:** estilos globales.
- **main.jsx:** punto de entrada de React.

## API REST simulada

La aplicación utiliza Mock Service Worker para interceptar solicitudes HTTP y proporcionar respuestas basadas en datos ficticios.

### Consultar categorías

```http
GET /api/categorias
```

Obtiene el listado de categorías literarias disponibles.

### Consultar libros por categoría

```http
GET /api/categorias/:id/libros
```

Obtiene los libros asociados a una categoría determinada.

La aplicación contempla respuestas HTTP de error y situaciones en las que una categoría no dispone de libros.

## Gestión de solicitudes

La comunicación con la API contempla diferentes situaciones:

- **Carga:** se informa al usuario mientras se procesa una solicitud.
- **Consulta exitosa:** se presentan los datos obtenidos.
- **Error:** se muestra un mensaje y una opción para reintentar.
- **Sin resultados:** se informa cuando una categoría no contiene libros.

Además, se utiliza una caché en memoria para reutilizar información previamente consultada y AbortController para gestionar la cancelación de solicitudes.

## Interfaz y navegación

La aplicación dispone de las siguientes secciones:

- **Inicio:** presentación de Librería Virtual.
- **Categorías:** exploración de categorías literarias.
- **Libros:** visualización de títulos correspondientes a una categoría.
- **Quiénes somos:** información sobre la propuesta y los objetivos de Librería Virtual.
- **Contacto:** formulario de consultas con validación de campos.

La interfaz incorpora un sistema de visualización en modo claro y oscuro. La preferencia seleccionada se conserva mediante LocalStorage.

## Pruebas y verificaciones

El proyecto dispone de comandos para comprobar su funcionamiento y calidad de código.

**Análisis estático:**

```bash
npm run lint
```

**Ejecución de pruebas:**

```bash
npm run test
```

**Compilación de producción:**

```bash
npm run build
```

### Comprobación de respuestas HTTP

Para comprobar el manejo de errores, es posible utilizar las siguientes condiciones:

- Acceder a `/categorias/no-existe` para verificar el tratamiento de categorías inexistentes.
- Incorporar el parámetro `?error=500` a las solicitudes de la API simulada para comprobar el manejo de errores internos.
- Consultar una categoría sin libros para verificar el mensaje correspondiente.
- Revisar las solicitudes desde las herramientas de desarrollo del navegador.

## Diseño adaptable

La interfaz está diseñada para ajustarse a diferentes resoluciones de pantalla, facilitando la navegación y consulta de información desde computadores, tabletas y dispositivos móviles.

---

**Librería Virtual | Desarrollo Frontend II**