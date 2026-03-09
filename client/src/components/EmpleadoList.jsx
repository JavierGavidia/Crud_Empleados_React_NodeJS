export default function EmpleadoList({ empleados }) {
  return (
    <ul>
      {empleados.map(emp => (
        <li key={emp.id}>
          {emp.nombre} - {emp.puesto} - {emp.edad} años - {emp.salario} €.
        </li>
      ))}
    </ul>
  );
}