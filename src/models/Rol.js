// Archivo src\models\Rol.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

export const Rol = sequelize.define(
  'roles',
  {
    nombreRol: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
  },
  {
    timestamps: false,
  },
);
