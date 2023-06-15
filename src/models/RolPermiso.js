// Archivo src\models\RolPermiso.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { Rol } from './Rol';
import { Permiso } from './Permiso';

export const RolPermiso = sequelize.define(
  'rol_permiso',
  {
    rol_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: { model: Rol, key: 'nombre' }, // Agregado
    },
    permiso_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: { model: Permiso, key: 'codigo' }, // Agregado
    },
  },
  {
    timestamps: false,
  },
);
