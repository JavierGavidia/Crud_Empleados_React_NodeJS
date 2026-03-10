const API_URL = "http://localhost:3000/empleados";

// Obtener empleados
export const getEmpleados = async () => {

    const response = await fetch(API_URL);

    return response.json();

}

// Crear Empleado
export const crearEmpleado = async (empleado) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(empleado)
    });

    return response.json();

};

// Obtener empleado por id
export const getEmpleadoById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener empleado");
    }

    return response.json();
}

// Actualizar empleado por id
export const actualizarEmpleado  = async (id, empleado) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(empleado)
    });

    return response.json();
};

// Eliminar empleado por id
export const eliminarEmpleado = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    return response.json();
}