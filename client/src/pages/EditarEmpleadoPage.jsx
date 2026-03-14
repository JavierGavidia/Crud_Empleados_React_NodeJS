import EmpleadoForm from "../components/EmpleadoForm";
import { getEmpleadoById, actualizarEmpleado } from "../services/empleadosService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalForm from "../components/ModalForm";

function EditarEmpleadoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);
  const [exitoModalOpen, setExitoModalOpen] = useState(false);

  useEffect(() => {
    getEmpleadoById(id).then(setEmpleado);
  }, [id]);

  const handleSubmit = async (datos) => {
    await actualizarEmpleado(id, datos);
    setExitoModalOpen(true);
  };

  const handleVolver = () => {
    setExitoModalOpen(false);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (!empleado) return <p>Cargando...</p>;

  return (
    <div className="container mt-5">
      <h2>Editar empleado</h2>

      <EmpleadoForm
        empleadoInicial={empleado}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <ModalForm
        isOpen={exitoModalOpen}
        onClose={handleVolver}
        title="Empleado actualizado"
        btnCancelText="Volver"
      >
        <p>El empleado se ha actualizado correctamente.</p>
      </ModalForm>
    </div>
  );
}

export default EditarEmpleadoPage;