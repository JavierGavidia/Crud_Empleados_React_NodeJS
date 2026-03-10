import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmpleadosPage from "./pages/EmpleadosPage";
import CrearEmpleadoPage from "./pages/CrearEmpleadoPage";
import EditarEmpleadoPage from "./pages/EditarEmpleadoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<EmpleadosPage />} />
        <Route path="/crear" element={<CrearEmpleadoPage />} />
        <Route path="/editar/:id" element={<EditarEmpleadoPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;