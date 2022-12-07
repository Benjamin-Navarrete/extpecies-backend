import { Router } from "express";
const router = Router();

import * as usuariosController from "../controllers/usuarios.controller";

// CRUD usuarios
router.get("/", usuariosController.getUsers);

router.post("/", usuariosController.createUser);

router.put("/:id", usuariosController.updateUser);

router.delete("/:id", usuariosController.deleteUser);

router.get("/:id", usuariosController.getUserById);

export default router;
