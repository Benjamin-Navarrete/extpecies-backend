const { Router } = require("express");
const router = Router();

const {
  getUsers,
  createUser,
  getUserById,
} = require("../controllers/index.controller");

router.get("/usuarios", getUsers);
router.get("/usuarios/:id", getUserById);
router.post("/usuarios", createUser);

module.exports = router;
