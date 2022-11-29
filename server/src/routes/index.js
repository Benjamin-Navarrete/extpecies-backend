const { Router } = require("express");
const router = Router();

const { getUsers } = require("../controllers/index.controller");

router.get("/usuarios", getUsers);
module.exports = router;
