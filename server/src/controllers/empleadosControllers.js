import db from "../db/connection.js";

// Obtener empleados
export const getEmpleados = async (req, res) => {
    try {

        const [rows] = await db.query("SELECT * FROM empleados");
        res.json(rows);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

// Crear empleado
export const crearEmpleado = async (req, res) => {
    try {

        const { nombre, puesto, edad, salario } = req.body;

        const [result] = await db.query(
            "INSERT INTO empleados (nombre, puesto, edad, salario) VALUES (?, ?, ?, ?)",
            [nombre, puesto, edad, salario]
        );

        const [nuevoEmpleado] = await db.query(
            "SELECT * FROM empleados WHERE id = ?",
            [result.insertId]
        );

        res.status(201).json(nuevoEmpleado[0]);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};

// Obtener empleado por ID
export const getEmpleadoById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(
            "SELECT * FROM empleados WHERE id = ?",
            [id]
        );
        res.json(rows[0]);
    } catch (error) {
        console.error("ERROR getEmpleadoById:", error);
        res.status(500).json({ error: error.message });
    }
};

// Actualizar empleado
export const actualizarEmpleado = async (req, res) => {

    try {

        // obtenemos el id desde la URL
        const { id } = req.params;

        // obtenemos los datos enviados desde React
        const { nombre, edad, puesto, salario } = req.body;

        // ejecutamos la actualización en MySQL
        await db.query(
            "UPDATE empleados SET nombre = ?, edad = ?, puesto = ?, salario = ? WHERE id = ?",
            [nombre, edad, puesto, salario, id]
        );

        // devolvemos respuesta
        res.json({ message: "Empleado actualizado correctamente" });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};