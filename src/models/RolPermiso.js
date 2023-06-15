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

Rol.belongsToMany(Permiso, {
  through: RolPermiso,
  as: 'permisos',
  foreignKey: 'rol_id',
  otherKey: 'permiso_id',
});
Permiso.belongsToMany(Rol, {
  through: RolPermiso,
  as: 'roles',
  foreignKey: 'permiso_id',
  otherKey: 'rol_id',
});
