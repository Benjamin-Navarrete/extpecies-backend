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
  sitio: {
    type: DataTypes.TEXT,
  },
  numeroLocaciones: {
    type: DataTypes.TEXT,
  },
  limiteElevacionSuperior: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  limiteElevacionInferior: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  descripcionGeografica: {
    type: DataTypes.TEXT,
  },
  tendenciaPoblacion: {
    type: DataTypes.TEXT,
  },
  detallesPoblacion: {
    type: DataTypes.TEXT,
  },
  sistemaHabitat: {
    type: DataTypes.TEXT,
  },
  tiposHabitat: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  detallesHabitat: {
    type: DataTypes.TEXT,
  },
  detallesAmenazas: {
    type: DataTypes.TEXT,
  },
  accionesConservacion: {
    type: DataTypes.TEXT,
  },
  bibliografia: {
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
