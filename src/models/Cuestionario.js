// Archivo src/models/Cuestionario.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { Usuario } from './Usuario';

export const Cuestionario = sequelize.define(
  'cuestionarios',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
      type: DataTypes.INTEGER,
    },
    percentage: {
      type: DataTypes.FLOAT,
    },
    num_questions: {
      type: DataTypes.INTEGER,
    },
    fecha_hora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  },
);

// Relación uno a muchos con Usuario
Cuestionario.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuario_id' });
Usuario.hasMany(Cuestionario, {
  as: 'cuestionarios',
  foreignKey: 'usuario_id',
});
