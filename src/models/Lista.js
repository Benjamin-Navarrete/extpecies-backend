// Archivo src\models\Lista.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
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
Usuario.hasMany(Lista, { foreignKey: 'usuario_id', sourceKey: 'id' });
Lista.belongsTo(Usuario, { foreignKey: 'usuario_id', targetKey: 'id' });

// Establezco una relación de muchos a muchos entre Lista y Especie
Lista.belongsToMany(Especie, {
  through: { model: 'listas_especies' },
  foreignKey: 'lista_id',
  otherKey: 'especie_id',
  as: 'especies',
});
Especie.belongsToMany(Lista, {
  through: { model: 'listas_especies' },
  foreignKey: 'especie_id',
  otherKey: 'lista_id',
  as: 'listas',
});
