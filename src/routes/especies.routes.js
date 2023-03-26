import { Router } from "express";
const router = Router();

import * as especiesController from "../controllers/especies.controller";
import { authJwt } from "../middlewares";

// CRUD especies
router.get(
  "/",
  [authJwt.verifyToken, authJwt.isEditor],
  especiesController.getEspecies
);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isEditor],
  especiesController.createEspecie
);

router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isEditor],
  especiesController.updateEspecie
);

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isEditor],
  especiesController.deleteEspecie
);

router.get(
  "/:id",
  [authJwt.verifyToken, authJwt.isEditor],
  especiesController.getEspecieById
);

router.get(
  "/:id/ubicaciones",
  [authJwt.verifyToken, authJwt.isEditor],
  especiesController.getUbicacionesEspecies
);

export default router;
