// Archivo src\models\Likes.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { Usuario } from './Usuario';
import { Especie } from './Especie';

export const Likes = sequelize.define('likes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  id_especie: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    references: {
      model: Especie,
      key: 'id',
    },
  },
});

Likes.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Likes.belongsTo(Especie, { foreignKey: 'id_especie' });
Usuario.hasMany(Likes, { foreignKey: 'id_usuario' });
Especie.hasMany(Likes, { foreignKey: 'id_especie' });
