import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmpleadoForm from "../components/EmpleadoForm";
import { getEmpleadoById, actualizarEmpleado } from "../services/empleadosService";

function EditarEmpleadoPage() {

    const { id } = useParams(); // id de la URL
    const navigate = useNavigate();
    const [empleado, setEmpleado] = useState(null);

    // ======================
    // Cargar empleado
    // ======================
    useEffect(() => {

        const cargarEmpleado = async () => {
            const data = await getEmpleadoById(id);
            setEmpleado(data);
        }

        cargarEmpleado();

    }, [id]);

    // Si todavía no tenemos datos del empleado, no renderizamos el formulario
    if (!empleado) {
        return <p>Cargando empleado...</p>;
    } 

    // =======================
    // Guardar cambios
    // =======================
    const handleSubmit =  async (empleadoActualizado) => {

        await actualizarEmpleado(id, empleadoActualizado);

        navigate("/"); // Volvemos a la lista
    };

    const handleCancel = () => {
        navigate("/") // Cancelar y volver
    }

    return (
        <div className="container mt-5">
            <h2>Editar empleado</h2>

            <EmpleadoForm 
                empleadoInicial={empleado}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
            
        </div>
    );
}

export default EditarEmpleadoPage;