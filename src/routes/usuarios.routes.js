import { Router } from "express";
const router = Router();

import * as usuariosController from "../controllers/usuarios.controller";
import { authJwt } from "../middlewares";

// CRUD usuarios

router.get(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  usuariosController.getUsers
);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  usuariosController.createUser
);

router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isUser],
  usuariosController.updateUser
);

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  usuariosController.deleteUser
);

router.get(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  usuariosController.getUserById
);

export default router;
