import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmpleadosPage from "./pages/EmpleadosPage";
import CrearEmpleadoPage from "./pages/CrearEmpleadoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<EmpleadosPage />} />
        <Route path="/crear" element={<CrearEmpleadoPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;