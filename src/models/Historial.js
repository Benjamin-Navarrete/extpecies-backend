// Archivo src\models\Historial.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
// import { Usuario } from './Usuario';

export const Historial = sequelize.define(
  'historial',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    especie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    informacion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);
