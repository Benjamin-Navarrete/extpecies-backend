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
    fotoPerfil: {
      type: DataTypes.STRING,
      defaultValue: 'default-profile.jpg',
    },
    fotoPortada: {
      type: DataTypes.STRING,
      defaultValue: 'default-cover.jpg',
    },
    username: {
      type: DataTypes.STRING,
    },
    especiesVisionadas: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // Agregar un campo de estado al modelo de Usuario, que sea un booleano que indique si el usuario está activado o desactivado
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  },
);

// Relación uno a muchos con Rol
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

// Función para generar un número aleatorio entre un rango dado y verificar que no exista otro usuario con el mismo username
Usuario.generarNumeroAleatorio = async function (nombre, min, max) {
  // Generar un número aleatorio entre min y max
  let numero = Math.floor(Math.random() * (max - min + 1)) + min;
  // Concatenar el nombre y  con el número
  let username = nombre + '.' + numero;
  // Buscar si existe otro usuario con el mismo username
  let usuario = await Usuario.findOne({ where: { username: username } });
  // Si existe, generar otro número aleatorio y repetir el proceso
  while (usuario) {
    numero = Math.floor(Math.random() * (max - min + 1)) + min;
    username = nombre + '.' + numero;
    usuario = await Usuario.findOne({ where: { username: username } });
  }
  // Devolver el username generado
  return username;
};

// Crear una función para activar o desactivar un usuario, que reciba el id del usuario y el estado deseado, y que actualice el campo de estado en la base de datos
Usuario.activarODesactivar = async function (id, estado) {
  // Buscar el usuario por el id
  let usuario = await Usuario.findByPk(id);
  // Si existe, actualizar el campo de estado con el valor recibido
  if (usuario) {
    usuario.estado = estado;
    await usuario.save();
  }
  // Devolver el usuario actualizado o null si no se encontró
  return usuario;
};

// Crear un scope para el modelo de Usuario, que solo incluya los usuarios activados, y usar ese scope en todas las consultas que involucren al modelo de Usuario, para filtrar los usuarios desactivados
Usuario.addScope('activos', {
  where: {
    estado: true,
  },
});
