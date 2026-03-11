import { useEffect, useState } from "react";
import { getEmpleados, eliminarEmpleado } from "../services/empleadosService";
import ModalForm from "../components/ModalForm";
import { useNavigate } from "react-router-dom";

function EmpleadosPage() {
    // Estado que guarda la lista de empleados obtenida de la API
    const [empleados, setEmpleados] = useState([]);

    // Estado para controlar el modal de eliminar
    const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null) // guardará qué empleado queremos eliminar

    // Estado que guarda la configuración de orden actual
    const [configuracionOrden, setConfiguracionOrden] = useState({
        campo: null,
        direccion: "asc"
    });

    const navigate = useNavigate();

    // Cargar empleados
    useEffect(() => {

        const cargarEmpleadosDesdeAPI  = async () => {
            const dataEmpleados  = await getEmpleados();

            setEmpleados(dataEmpleados);
        }

        cargarEmpleadosDesdeAPI();

    }, []);

    // =========================
    // Cambiar el orden al clicar en una columna
    // =========================
    const cambiarOrdenColumna = (campo) => {
        let nuevaDireccion = "asc";

        // Si ya estamos ordenando por esta columna, invertimos el orden
        if(configuracionOrden.campo === campo && configuracionOrden.direccion === "asc"){
            nuevaDireccion = "desc";
        }

        setConfiguracionOrden({campo, direccion: nuevaDireccion});
    };

    // =========================
    // Generar lista ordenada (SIN modificar el estado original)
    // =========================
    const listaEmpleadosOrdenada = [...empleados].sort((empleadoA, empleadoB) => {

        const { campo, direccion } = configuracionOrden;

        // Si aún no hay orden seleccionado
        if(!campo) return 0;

        const valorA = empleadoA[campo];
        const valorB = empleadoB[campo];

        // Ordenación para textos
        if (typeof valorA === "string"){
            const resultado = valorA.localeCompare(valorB, "es");
            return direccion === "asc" ? resultado : -resultado;
        }

        // Ordenación para números
        if(direccion === "asc"){
            return valorA - valorB;
        } else {
            return valorB - valorA;
        }
    });

    // Devuelve el icono de orden para cada columna
    const ponerIconoOrden = (campoColumna) => {
        //Si esta columna no está siendo ordenada
        if(configuracionOrden.campo !== campoColumna) {
            return "⬍"; // icono neutro
        }

        // Si esta ordenada ascendente
        if (configuracionOrden.direccion === "asc"){
            return "▲";
        }

        // Si está ordenada descendente
        return "▼";
    }

    const handleEliminar = async (id) => {

        await eliminarEmpleado(id);

        setEmpleados(prev => prev.filter(empleado => empleado.id !== id));

        // Una vez eliminado limpiamos el estado
        setEmpleadoAEliminar(null);

    };


    return (
        <div className="container my-5">
            <h1 className="mb-4">Lista de empleados</h1>

            <button className="btn btn-primary mb-3" onClick={() => navigate("/crear")}>Crear empleado</button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th onClick={() => cambiarOrdenColumna("nombre")} style={{cursor:"pointer"}}>Nombre {ponerIconoOrden("nombre")}</th>
                        <th onClick={() => cambiarOrdenColumna("edad")} style={{cursor:"pointer"}}>Edad {ponerIconoOrden("edad")}</th>
                        <th onClick={() => cambiarOrdenColumna("puesto")} style={{cursor:"pointer"}}>Puesto {ponerIconoOrden("puesto")}</th>
                        <th onClick={() => cambiarOrdenColumna("salario")} style={{cursor:"pointer"}}>Salario {ponerIconoOrden("salario")}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaEmpleadosOrdenada.map((empleado) => (
                        <tr key={empleado.id}>
                            <td>{empleado.nombre}</td>
                            <td>{empleado.edad}</td>
                            <td>{empleado.puesto}</td>
                            <td>{empleado.salario}</td>

                            <td>
                                {/* Boton para editar el cliente */}
                                <button className="btn btn-warning btn-sm me-2" 
                                onClick={() => {
                                    navigate(`/editar/${empleado.id}`)
                                }}>Editar</button>

                                {/* Boton para eliminar el cliente */}
                                <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => setEmpleadoAEliminar(empleado)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalEliminar"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL */}
            <ModalForm 
                id="modalEliminar"
                title="Confirmar eliminación de empleado"
                confirmText="Eliminar"
                onConfirm={() => empleadoAEliminar && handleEliminar(empleadoAEliminar.id)}> 

                    {empleadoAEliminar && (
                        <p>
                            ¿Seguro que quieres eliminar a <strong>{empleadoAEliminar.nombre}</strong>
                        </p>
                    )}

            </ModalForm>
        </div>
    );
}

export default EmpleadosPage;