import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Ubicacion = sequelize.define("ubicaciones", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  latitud: {
    type: DataTypes.DOUBLE,
  },
  longitud: {
    type: DataTypes.DOUBLE,
  },
});
