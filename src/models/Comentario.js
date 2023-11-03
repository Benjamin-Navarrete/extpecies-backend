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
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  especie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Especie,
      key: 'id',
    },
  },
});

Comentario.belongsTo(Usuario, { foreignKey: 'usuario_id', targetKey: 'id' });
Usuario.hasMany(Comentario, { foreignKey: 'usuario_id', sourceKey: 'id' });

Comentario.belongsTo(Especie, { foreignKey: 'especie_id', targetKey: 'id' });
Especie.hasOne(Comentario, { foreignKey: 'especie_id', sourceKey: 'id' });
