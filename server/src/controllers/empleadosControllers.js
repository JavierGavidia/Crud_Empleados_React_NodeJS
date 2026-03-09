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
        
        const {nombre, puesto, edad, salario} = req.body;

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
        
        res.status(500).json({ error: error.message});

    }
};