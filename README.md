# Extpecies Backend

Extpecies es una API RESTful desarrollada con Node.js, Express y Sequelize que provee los datos y la lógica de negocio para la aplicación web de Extpecies. La API se encarga de gestionar la autenticación y autorización de los usuarios, el almacenamiento y la consulta de los datos de las especies en peligro de extinción, el registro y la evaluación de las respuestas de los usuarios a las preguntas sobre biodiversidad, el cálculo y la actualización de los puntos y los niveles de los usuarios según el sistema de gamificación y la creación y el manejo de las publicaciones y los comentarios de los usuarios en la red social. Extpecies es una API segura, eficiente y escalable que soporta el funcionamiento de la aplicación web de Extpecies.

## Instalación

1. Clona este repositorio.
2. Abre una terminal en la carpeta del proyecto.
3. Instala las dependencias con `npm install`.
4. Crea un archivo `.env` en la carpeta `src` con la siguiente información:

```env
DB_NAME=AQUÍ DEBE IR EL NOMBRE DE TU DB
DB_USER=AQUÍ DEBE IR EL USUARIO DE TU DB
DB_PASSWORD=LA CONTRASEÑA DE TU DB
PORT=3500

SECRET=TU CONTRASEÑA SECRETA
```

5. Ejecuta `npm run dev` para iniciar el servidor de desarrollo.

## Scripts

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye el proyecto con Babel.
- `npm start`: Inicia el servidor en producción.
