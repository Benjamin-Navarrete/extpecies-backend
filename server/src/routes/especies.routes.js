import { Router } from "express";
const router = Router();

import * as especiesController from "../controllers/especies.controller";

// CRUD especies
router.get("/", especiesController.getEspecies);

router.post("/", especiesController.createEspecie);

router.put("/:id", especiesController.updateEspecie);

router.delete("/:id", especiesController.deleteEspecie);

router.get("/:id", especiesController.getEspecieById);

export default router;
