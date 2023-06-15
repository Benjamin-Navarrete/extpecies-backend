// Archivo src\models\Permiso.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

export const Permiso = sequelize.define('permisos', {
  codigo: {
    type: DataTypes.STRING,
    primaryKey: true, // Agregado
    unique: true,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
});
