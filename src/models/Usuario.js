// Archivo src\models\Usuario.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { Rol } from './Rol';
import { Permiso } from './Permiso';
import { Historial } from './Historial';

export const Usuario = sequelize.define(
  'usuarios',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: {
      type: DataTypes.STRING,
    },
    apellidos: {
      type: DataTypes.STRING,
    },
    correo: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    pais: {
      type: DataTypes.STRING,
    },
    boletinInformativo: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  },
);

Usuario.belongsTo(Rol, { as: 'rol', foreignKey: 'nombre_rol' });
Rol.hasMany(Usuario, { as: 'usuarios', foreignKey: 'nombre_rol' });

// Relación uno a muchos con Usuario
Usuario.hasMany(Historial, { foreignKey: 'usuario_id', sourceKey: 'id' });
Historial.belongsTo(Usuario, { foreignKey: 'usuario_id', targetKey: 'id' });

Usuario.prototype.getRoleAndPermissions = async function () {
  const usuarioConRol = await Usuario.findByPk(this.id, {
    include: {
      model: Rol,
      as: 'rol',
      include: {
        model: Permiso,
        as: 'permisos',
        through: { attributes: [] }, // No incluir la tabla de asociación
      },
    },
  });

  return {
    rol: usuarioConRol.rol.nombre_rol,
    permisos: usuarioConRol.rol.permisos.map((permiso) => permiso.codigo),
  };
};
