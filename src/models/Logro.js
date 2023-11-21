// Archivo src/models/Logro.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

export const Logro = sequelize.define(
  'logros',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  },
);
