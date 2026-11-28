import { Routes, Route } from "react-router"
import RutaPrivada from "./componentes/RutaPrivada"
import Layout from "./componentes/Layout"
import Inicio from "./pages/Inicio"
import Login from "./pages/Login"
import Perfil from "./pages/Perfil"
import Recursos from "./pages/Recursos"
import Review from "./pages/Review"
import NotFound from "./pages/NotFound"
import EditarVideojuego from "./pages/EditarVideojuego"
import CrearVideojuego from "./pages/CrearVideojuego"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RutaPrivada />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/videojuegos" element={<Recursos />} />
          <Route path="/videojuegos/nuevo" element={<CrearVideojuego />} />
          <Route path="/resenas" element={<Review />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/videojuegos/:id/editar" element={<EditarVideojuego />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App