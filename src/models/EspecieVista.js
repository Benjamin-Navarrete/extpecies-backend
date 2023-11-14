// Archivo src/models/EspecieVista.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { Usuario } from './Usuario';
import { Especie } from './Especie';

export const EspecieVista = sequelize.define(
  'especies_vistas',
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Usuario,
        key: 'id',
      },
    },
    id_especie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Especie,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  },
);

// Relación de muchos a muchos entre Usuario y Especie
Usuario.belongsToMany(Especie, {
  through: { model: EspecieVista },
  foreignKey: 'id_usuario',
  otherKey: 'id_especie',
  as: 'especiesVistas',
});
Especie.belongsToMany(Usuario, {
  through: { model: EspecieVista },
  foreignKey: 'id_especie',
  otherKey: 'id_usuario',
  as: 'usuarios',
});
