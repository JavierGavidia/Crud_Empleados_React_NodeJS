import EmpleadoForm from "../components/EmpleadoForm";
import { crearEmpleado } from "../services/empleadosService";
import { useNavigate } from "react-router-dom";

function CrearEmpleadoPage() {

    const navigate = useNavigate();

    const handleSubmit = async (empleado) => {
        // Guardar en backend
        await crearEmpleado(empleado);

        navigate("/"); // Volvemos a la lista
    };

    const handleCancel = () => {
        navigate("/"); // Cancelar y volver
    }

    return (
        <div className="container mt-5">
            <h2>Crear empleado</h2>

            {/* Utilizamos nuestro componente de formulario */}
            <EmpleadoForm 
                empleadoInicial={{}} // Nuevo empleado
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
            
        </div>
    )
}

export default CrearEmpleadoPage;