import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmpleadoById, actualizarEmpleado } from "../services/empleadosService";

function EditarEmpleadoPage() {

    const { id } = useParams(); // id de la URL
    const navigate = useNavigate();

    // Estando del formulario
    const [empleado, setEmpleado] = useState({
        nombre: "",
        edad: "",
        puesto: "",
        salario: ""
    });

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

    // =======================
    // Controlar inputs
    // =======================
    const handleChange = (e) => {
        const {name, value} = e.target;

        setEmpleado({...empleado, [name]: value});
    };

    // =======================
    // Guardar cambios
    // =======================
    const handleSubmit =  async (e) => {
        e.preventDefault();

        await actualizarEmpleado(id, empleado);

        navigate("/");
    };

    return (
        <div className="container mt-5">
            <h2>Editar empleado</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="formControl" name="nombre" value={empleado.nombre} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="edad" className="form-label">Edad</label>
                    <input type="number" className="formControl" name="edad" value={empleado.edad} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="puesto" className="form-label">Puesto</label>
                    <input type="text" className="formControl" name="puesto" value={empleado.puesto} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="salario" className="form-label">Salario</label>
                    <input type="number" className="formControl" name="salario" value={empleado.salario} onChange={handleChange} />
                </div>

                {/* Si no le ponemos nada al boton de un formulario será submit por defecto no le tenemos que poner el onClick */}
                <button type="submit" className="btn btn-success me-2">Guardar cambios</button>

                <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancelar</button>

            </form>
        </div>
    );
}

export default EditarEmpleadoPage;