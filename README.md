# Extpecies Backend

Este proyecto es un backend para una aplicación web que permite visualizar información sobre especies animales en peligro de extinción. El backend está desarrollado en Express y utiliza Sequelize como ORM para la base de datos.

## Instalación

1. Clona este repositorio.
2. Instala las dependencias con `npm install`.

## Scripts

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye el proyecto con Babel.
- `npm start`: Inicia el servidor en producción.

## Dependencias

- bcryptjs: Librería para hashear contraseñas.
- cors: Middleware de Express para habilitar CORS.
- express: Framework web de Node.js.
- jsonwebtoken: Librería para generar y verificar tokens de autenticación.
- morgan: Middleware de Express para registrar peticiones HTTP.
- pg: Driver de PostgreSQL para Node.js.
- pg-hstore: Librería para mapear datos JSON a tipos de datos de PostgreSQL.
- sequelize: ORM para bases de datos relacionales.

## Estructura del proyecto

- `.babelrc`: Configuración de Babel.
- `.prettierrc`: Configuración de Prettier.
- `README.md`: Archivo con información sobre el proyecto.
- `package-lock.json`: Archivo generado por npm para asegurar la reproducibilidad de las dependencias.
- `package.json`: Archivo con información sobre el proyecto y sus dependencias.
- `src/`: Carpeta con el código fuente del proyecto.
  - `app.js`: Archivo principal de la aplicación Express.
  - `config.js`: Archivo con la configuración del proyecto.
  - `controllers/`: Carpeta con los controladores de Express.
  - `database/`: Carpeta con los archivos relacionados a la base de datos.
  - `index.js`: Archivo que arranca la aplicación Express y se conecta a la base de datos.
  - `middlewares/`: Carpeta con los middlewares de Express.
  - `models/`: Carpeta con los modelos de Sequelize.
  - `routes/`: Carpeta con los archivos de rutas de Express.
