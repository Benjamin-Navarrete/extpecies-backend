"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ubicacion = void 0;
var _sequelize = require("sequelize");
var _database = require("../database/database");
var Ubicacion = _database.sequelize.define("ubicaciones", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  latitud: {
    type: _sequelize.DataTypes.DOUBLE
  },
  longitud: {
    type: _sequelize.DataTypes.DOUBLE
  }
});
exports.Ubicacion = Ubicacion;