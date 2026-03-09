import { useState } from "react";
import { crearEmpleado } from "../services/empleadosService";
import { useNavigate } from "react-router-dom";

function CrearEmpleadoPage() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        puesto: "",
        edad: "",
        salario: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await crearEmpleado(form);

        navigate("/");

    };

    return (
        <div className="container mt-5">
            <h2>Crear empleado</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="nombre" className="form-control" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Edad</label>
                    <input type="number" name="edad" className="form-control" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Puesto</label>
                    <input type="text" name="puesto" className="form-control" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Salario</label>
                    <input type="number" name="salario" className="form-control" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success me-2">Guardar</button>

                <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancelar</button>

            </form>
        </div>
    )
}

export default CrearEmpleadoPage;