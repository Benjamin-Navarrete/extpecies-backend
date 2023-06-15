// Archivo src\models\Rol.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

export const Rol = sequelize.define('roles', {
  nombre: {
    type: DataTypes.STRING,
    primaryKey: true, // Agregado
    unique: true,
  },
});
