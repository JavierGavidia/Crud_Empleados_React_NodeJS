import { useState } from "react";

export default function EmpleadoForm({ onNuevoEmpleado }) {
  const [nombre, setNombre] = useState("");
  const [puesto, setPuesto] = useState("");
  const [edad, setEdad] = useState("");
  const [salario, setSalario] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoEmpleado = { nombre, puesto, edad: Number(edad), salario: Number(salario) };

    try {
      const res = await fetch("http://localhost:3000/empleados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEmpleado)
      });

      const data = await res.json();
      onNuevoEmpleado(data); // agrega a la lista en App
      setNombre(""); setPuesto(""); setEdad(""); setSalario(""); // limpia formulario
    } catch (error) {
      console.error("Error creando empleado:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
      <input value={puesto} onChange={(e) => setPuesto(e.target.value)} placeholder="Puesto" required />
      <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Edad" required />
      <input type="number" value={salario} onChange={(e) => setSalario(e.target.value)} placeholder="Salario" required />
      <button type="submit">Crear Empleado</button>
    </form>
  );
}