import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmpleadoForm from "../components/EmpleadoForm";
import { getEmpleadoById, actualizarEmpleado } from "../services/empleadosService";
import ModalForm from "../components/ModalForm";
import { Modal } from "bootstrap";

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

        const modal = new Modal(
            document.getElementById("modalExito")
        );

        modal.show();
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

            {/* MODAL */}
            <ModalForm
                id="modalExito"
                title="Empleado actualizado"
                confirmText="Volver"
                onConfirm={ () => navigate("/") }
            >
                <p>El empleado <strong>{empleado.nombre}</strong> se ha actualizado con éxito.</p> 
            </ModalForm>
            
        </div>

        
    );
}

export default EditarEmpleadoPage;