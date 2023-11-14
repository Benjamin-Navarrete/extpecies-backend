// Archivo src/models/UsuarioLogro.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { Usuario } from './Usuario';
import { Logro } from './Logro';

export const UsuarioLogro = sequelize.define(
  'usuarios_logros',
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Usuario,
        key: 'id',
      },
    },
    id_logro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Logro,
        key: 'id',
      },
    },
    fecha: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  },
);

// Relación de muchos a muchos entre Usuario y Logro
Usuario.belongsToMany(Logro, {
  through: { model: UsuarioLogro },
  foreignKey: 'id_usuario',
  otherKey: 'id_logro',
  as: 'logros',
});
Logro.belongsToMany(Usuario, {
  through: { model: UsuarioLogro },
  foreignKey: 'id_logro',
  otherKey: 'id_usuario',
  as: 'usuarios',
});
