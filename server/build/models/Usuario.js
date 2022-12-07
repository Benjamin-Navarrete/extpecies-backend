"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Usuario = void 0;
var _sequelize = require("sequelize");
var _database = require("../database/database");
var Usuario = _database.sequelize.define("usuarios", {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rol: {
    type: _sequelize.DataTypes.STRING,
    defaultValue: "usuario"
  },
  nombres: {
    type: _sequelize.DataTypes.STRING
  },
  apellidos: {
    type: _sequelize.DataTypes.STRING
  },
  correo: {
    type: _sequelize.DataTypes.STRING
  },
  telefono: {
    type: _sequelize.DataTypes.STRING
  },
  password: {
    type: _sequelize.DataTypes.STRING
  }
});
exports.Usuario = Usuario;