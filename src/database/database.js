// Archivo src\database\database.js
import Sequelize from 'sequelize';

// Usar variables de entorno para el nombre de usuario y la contraseña
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'a';

export const sequelize = new Sequelize('extpeciesDB', DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});
