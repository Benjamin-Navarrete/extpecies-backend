// Archivo src\models\Especie.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

export const Especie = sequelize.define('especies', {
  nombreComun: {
    type: DataTypes.TEXT,
  },
  nombreCientifico: {
    type: DataTypes.TEXT,
  },
  imagen: {
    type: DataTypes.TEXT,
  },
  reino: {
    type: DataTypes.TEXT,
  },
  filo: {
    type: DataTypes.TEXT,
  },
  clase: {
    type: DataTypes.TEXT,
  },
  orden: {
    type: DataTypes.TEXT,
  },
  familia: {
    type: DataTypes.TEXT,
  },
  genero: {
    type: DataTypes.TEXT,
  },
  estadoConservacion: {
    type: DataTypes.TEXT,
  },
  rangoGeografico: {
    type: DataTypes.TEXT,
  },
  amenazas: {
    type: DataTypes.TEXT,
  },
  latitud: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  longitud: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});
