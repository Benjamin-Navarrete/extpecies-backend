"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Especie = void 0;
var _sequelize = require("sequelize");
var _database = require("../database/database");
var _Ubicacion = require("../models/Ubicacion");
var Especie = _database.sequelize.define("especies", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_comun: {
    type: _sequelize.DataTypes.STRING
  },
  nombre_cientifico: {
    type: _sequelize.DataTypes.STRING
  },
  categoria_conservacion: {
    type: _sequelize.DataTypes.STRING
  },
  rango_geografico: {
    type: _sequelize.DataTypes.STRING
  }
});
exports.Especie = Especie;
Especie.hasMany(_Ubicacion.Ubicacion, {
  foreignKey: "especie_id",
  sourceKey: "id"
});
_Ubicacion.Ubicacion.belongsTo(Especie, {
  foreignKey: "especie_id",
  targetId: "id"
});