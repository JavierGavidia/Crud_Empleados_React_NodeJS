import express from "express";

import {
    getEmpleados, crearEmpleado, getEmpleadoById, actualizarEmpleado
} from "../controllers/empleadosControllers.js";

const router = express.Router();

// GET /empleados
router.get("/", getEmpleados);

// POST /empleados
router.post("/", crearEmpleado);

// GET /empleados/:id ----> Obtener empleado por id
router.get("/:id", getEmpleadoById);

// PUT /empleados/:id ----> Actualizar empleado
router.put("/:id", actualizarEmpleado);

export default router;