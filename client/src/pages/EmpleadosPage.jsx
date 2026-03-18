import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmpleados, eliminarEmpleado } from "../services/empleadosService";
import useModal from "../hooks/useModal";
import ModalForm from "../components/ModalForm";

function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([]);
  const [configuracionOrden, setConfiguracionOrden] = useState({ campo: null, direccion: "asc" });

  const eliminarModal = useModal();
  const exitoEliminarModal = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    getEmpleados().then(setEmpleados);
  }, []);

  const cambiarOrdenColumna = (campo) => {
    const nuevaDireccion =
      configuracionOrden.campo === campo && configuracionOrden.direccion === "asc" ? "desc" : "asc";
    setConfiguracionOrden({ campo, direccion: nuevaDireccion });
  };

  const listaOrdenada = [...empleados].sort((a, b) => {
    const { campo, direccion } = configuracionOrden;
    if (!campo) return 0;
    const valA = a[campo];
    const valB = b[campo];
    if (typeof valA === "string") return direccion === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    return direccion === "asc" ? valA - valB : valB - valA;
  });

  // Devuelve el icono de orden para cada columna
  const ponerIconoOrden = (campoColumna) => {
    //Si esta columna no está siendo ordenada
    if (configuracionOrden.campo !== campoColumna) {
      return "⬍"; // icono neutro
    }

    // Si esta ordenada ascendente
    if (configuracionOrden.direccion === "asc") {
      return "▲";
    }

    // Si está ordenada descendente
    return "▼";
  }

  const abrirModalEliminar = (empleado) => eliminarModal.openModal(empleado);

  const handleEliminar = async () => {
    const empleado = eliminarModal.modalData;
    if (!empleado) return;
    await eliminarEmpleado(empleado.id);
    setEmpleados((prev) => prev.filter((e) => e.id !== empleado.id));
    eliminarModal.closeModal();
    exitoEliminarModal.openModal(empleado);
  };

  const handleVolverExitoEliminar = () => exitoEliminarModal.closeModal();

  return (
    <div className="container my-5">
      <h1>Lista de empleados</h1>
      <button className="btn btn-primary mb-3" onClick={() => navigate("/crear")}>Crear empleado</button>

      <table className="table table-striped">
        <thead>
          <tr>
            {["nombre", "edad", "puesto", "salario"].map((campo) => (
              <th key={campo} style={{ cursor: "pointer" }} onClick={() => cambiarOrdenColumna(campo)}>
                {campo.charAt(0).toUpperCase() + campo.slice(1)}{" "}
                {/* Icono dinámico */}
                <span style={{ marginLeft: "5px" }}>
                  {ponerIconoOrden(campo)}
                </span>
              </th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaOrdenada.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.nombre}</td>
              <td>{empleado.edad}</td>
              <td>{empleado.puesto}</td>
              <td>{empleado.salario}{" €"}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/editar/${empleado.id}`)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => abrirModalEliminar(empleado)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalForm
        isOpen={eliminarModal.isOpen}
        onClose={eliminarModal.closeModal}
        title="Confirmar eliminación"
        btnConfirmText="Confirmar"
        btnCancelText="Cancelar"
        onConfirm={handleEliminar}
      >
        {eliminarModal.modalData && (
          <p>¿Seguro que quieres eliminar a <strong>{eliminarModal.modalData.nombre}</strong>?</p>
        )}
      </ModalForm>

      <ModalForm
        isOpen={exitoEliminarModal.isOpen}
        onClose={handleVolverExitoEliminar}
        title="Empleado eliminado"
        btnCancelText="Volver"
      >
        <p>El empleado <strong>{exitoEliminarModal.modalData?.nombre}</strong> se ha eliminado correctamente.</p>
      </ModalForm>
    </div>
  );
}

export default EmpleadosPage;