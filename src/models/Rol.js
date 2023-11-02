// Archivo src\models\Rol.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

export const Rol = sequelize.define(
  'roles',
  {
    nombre_rol: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
  },
  {
    timestamps: false,
  },
);
