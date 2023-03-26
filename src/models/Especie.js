import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Ubicacion } from "../models/Ubicacion";

export const Especie = sequelize.define("especies", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_comun: {
    type: DataTypes.STRING,
  },
  nombre_cientifico: {
    type: DataTypes.STRING,
  },
  categoria_conservacion: {
    type: DataTypes.STRING,
  },
  rango_geografico: {
    type: DataTypes.STRING,
  },
});

Especie.hasMany(Ubicacion, {
  foreignKey: "especie_id",
  sourceKey: "id",
});

Ubicacion.belongsTo(Especie, {
  foreignKey: "especie_id",
  targetId: "id",
});
