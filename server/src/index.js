// Importamos Express
import express from "express";

// Importamos CORS para permitir peticiones desde React
import cors from "cors";

// Importamos empleados
import empleadosRoutes from "./routes/empleadosRoutes.js";

// Creamos la app de Express
const app = express();

// Middleware
app.use(cors());          // habilita CORS
app.use(express.json());   // permite recibir JSON en las peticiones


app.use("/empleados", empleadosRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});