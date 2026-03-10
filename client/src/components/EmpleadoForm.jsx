import { useState } from "react";

function EmpleadoForm({ empleadoInicial = {}, onSubmit, onCancel }) {

  // Estado del formulario
  const [empleado, setEmpleado] = useState(() => ({
    nombre: empleadoInicial?.nombre ?? "", // empleadoIncial? --> ?. es optional chaining y evita errores si el objeto llega null
    puesto: empleadoInicial?.puesto ?? "",
    edad: empleadoInicial?.edad ?? "",
    salario: empleadoInicial?.salario ?? ""
  }));

  // Manejar cambios inputs
  const handleChange = (e) => {

    const { name, value } = e.target;

    setEmpleado(prev => ({ ...prev, [name]: value })); // Esto evita problemas de estado en React concurrente.

  };

  // Enviar formulario
  const handleSubmit = (e) => {

    e.preventDefault();
    onSubmit(empleado);

  }

  return (

    <form onSubmit={handleSubmit} className="p-5">

      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input id="nombre" name="nombre" type="text" className="form-control" value={empleado.nombre} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label htmlFor="puesto" className="form-label">Puesto</label>
        <input id="puesto" name="puesto" type="text" className="form-control" value={empleado.puesto} onChange={handleChange} required />
      </div>

      <div className="row">
        <div className="mb-3 col-12 col-md-6">
          <label htmlFor="edad" className="form-label">Edad</label>
          <input id="edad" name="edad" type="number" className="form-control" value={empleado.edad} onChange={handleChange} required />
        </div>
        <div className="mb-3 col-12  col-md-6">
          <label htmlFor="salario" className="form-label">Salario</label>
          <input id="salario" name="salario" type="number" className="form-control" value={empleado.salario} onChange={handleChange} required />
        </div>
      </div>

      <button type="submit" className="btn btn-success me-2">Guardar</button>

      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>

    </form>

  )

}

export default EmpleadoForm;