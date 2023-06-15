// Archivo src\models\associations.js
import { Usuario } from './Usuario';
import { Rol } from './Rol';
import { Permiso } from './Permiso';
import { RolPermiso } from './RolPermiso';

// Un usuario tiene un rol
Usuario.belongsTo(Rol, { foreignKey: 'nombre', as: 'rol' });

// Un rol pertenece a muchos usuarios
Rol.Users = Rol.hasMany(Usuario); // Agregado Rol.Users

// Un rol puede tener muchos permisos
Rol.Permisos = Rol.belongsToMany(Permiso, { through: RolPermiso }); // Agregado Rol.Permisos

// Un permiso puede pertenecer a muchos roles
Permiso.Roles = Permiso.belongsToMany(Rol, { through: RolPermiso }); // Agregado Permiso.Roles
