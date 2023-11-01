// Archivo src\models\Lista.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
// Importo los modelos de Usuario y Especie
import { Usuario } from './Usuario';
import { Especie } from './Especie';

// Defino el modelo Lista con los atributos id, nombre y descripcion
export const Lista = sequelize.define(
  'listas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  },
);

// Establezco una relación de uno a muchos entre Usuario y Lista
Usuario.hasMany(Lista, { foreignKey: 'usuarioId', sourceKey: 'id' });
Lista.belongsTo(Usuario, { foreignKey: 'usuarioId', targetKey: 'id' });

// Establezco una relación de muchos a muchos entre Lista y Especie
Lista.belongsToMany(Especie, {
  through: 'listas_especies',
  foreignKey: 'listaId',
  otherKey: 'especieId',
});
Especie.belongsToMany(Lista, {
  through: 'listas_especies',
  foreignKey: 'especieId',
  otherKey: 'listaId',
});
