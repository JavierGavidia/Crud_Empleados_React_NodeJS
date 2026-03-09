import mysql from "mysql2/promise"; // Importamos mysql2 con soporte de promesas

const pool = mysql.createPool({
    host: "localhost", // dirección del servidor MySQL
    user: "root", // usuario de MySQL
    password: "", // contraseña del usuario
    database: "empresa_db", // nombre de la base de datos
    waitForConnections: true, // si no hay conexiones disponibles, espera
    connectionLimit: 10 // número máximo de conexiones simultáneas
})

// Exportamos el pool para usarlo en otros archivos
export default pool;