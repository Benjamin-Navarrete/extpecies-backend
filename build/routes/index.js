"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var _require2 = require("../controllers/index.controller"),
  getUsers = _require2.getUsers,
  createUser = _require2.createUser,
  getUserById = _require2.getUserById,
  deleteUser = _require2.deleteUser,
  updateUser = _require2.updateUser;

// CRUD usuarios
router.get("/usuarios", getUsers);
router.get("/usuarios/:id", getUserById);
router.post("/usuarios", createUser);
router["delete"]("/usuarios/:id", deleteUser);
router.put("/usuarios/:id", updateUser);
module.exports = router;