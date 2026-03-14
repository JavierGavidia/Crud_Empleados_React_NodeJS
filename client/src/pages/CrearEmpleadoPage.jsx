import EmpleadoForm from "../components/EmpleadoForm";
import { crearEmpleado } from "../services/empleadosService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalForm from "../components/ModalForm";

function CrearEmpleadoPage() {
  const navigate = useNavigate();
  const [exitoModalOpen, setExitoModalOpen] = useState(false);

  const handleSubmit = async (empleado) => {
    await crearEmpleado(empleado);
    setExitoModalOpen(true); // Abrir modal de éxito
  };

  const handleVolver = () => {
    setExitoModalOpen(false);
    navigate("/"); // Volver a la lista
  };

  const handleCancel = () => {
    navigate("/"); // Cancelar y volver
  };

  return (
    <div className="container mt-5">
      <h2>Crear empleado</h2>

      <EmpleadoForm
        empleadoInicial={{}}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <ModalForm
        isOpen={exitoModalOpen}
        onClose={handleVolver}
        title="Empleado creado"
        btnCancelText="Volver"
      >
        <p>El empleado se ha creado correctamente.</p>
      </ModalForm>
    </div>
  );
}

export default CrearEmpleadoPage;