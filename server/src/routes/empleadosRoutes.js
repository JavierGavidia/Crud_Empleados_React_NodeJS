import express from "express";

import {
    getEmpleados, crearEmpleado
} from "../controllers/empleadosController.js";

const router = express.Router();

// GET /empleados
router.get("/", getEmpleados);

// POST /empleados
router.post("/", crearEmpleado);

export default router;