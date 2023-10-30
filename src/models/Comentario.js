// Archivo src/models/Comentario.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { Usuario } from './Usuario';
import { Especie } from './Especie';

export const Comentario = sequelize.define('comentarios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  especieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Especie,
      key: 'id',
    },
  },
});

Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId', targetKey: 'id' });
Usuario.hasMany(Comentario, { foreignKey: 'usuarioId', sourceKey: 'id' });

Comentario.belongsTo(Especie, { foreignKey: 'especieId', targetKey: 'id' });
Especie.hasOne(Comentario, { foreignKey: 'especieId', sourceKey: 'id' });
