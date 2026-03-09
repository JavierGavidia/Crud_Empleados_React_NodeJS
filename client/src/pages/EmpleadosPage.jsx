import { useEffect, useState } from "react";
import { getEmpleados } from "../services/empleadosService";
import { useNavigate } from "react-router-dom";

function EmpleadosPage() {
    // Estado que guarda la lista de empleados obtenida de la API
    const [empleados, setEmpleados] = useState([]);

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


    return (
        <div className="container mt-5">
            <h1 className="mb-4">Lista de empleados</h1>

            <button className="btn btn-primary mb-3" onClick={() => navigate("/crear")}>Crear empleado</button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th onClick={() => cambiarOrdenColumna("nombre")} style={{cursor:"pointer"}}>Nombre</th>
                        <th onClick={() => cambiarOrdenColumna("edad")} style={{cursor:"pointer"}}>Edad</th>
                        <th onClick={() => cambiarOrdenColumna("puesto")} style={{cursor:"pointer"}}>Puesto</th>
                        <th onClick={() => cambiarOrdenColumna("salario")} style={{cursor:"pointer"}}>Salario</th>
                    </tr>
                </thead>
                <tbody>
                    {listaEmpleadosOrdenada.map((empleado) => (
                        <tr key={empleado.id}>
                            <td>{empleado.nombre}</td>
                            <td>{empleado.edad}</td>
                            <td>{empleado.puesto}</td>
                            <td>{empleado.salario}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmpleadosPage;