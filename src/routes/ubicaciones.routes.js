import { Router } from "express";
const router = Router();

import * as ubicacionesController from "../controllers/ubicaciones.controller";

// CRUD ubicaciones
router.get("/", ubicacionesController.getUbicaciones);

router.post("/", ubicacionesController.createUbicacion);

router.put("/:id", ubicacionesController.updateUbicacion);

router.delete("/:id", ubicacionesController.deleteUbicacion);

router.get("/:id", ubicacionesController.getUbicacionById);

export default router;
