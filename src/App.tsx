import { Routes, Route } from "react-router"
import Inicio from "./pages/Inicio"
import Login from "./pages/Login"
import Perfil from "./pages/Perfil"
import Videojuegos from "./pages/Recursos"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/videojuegos" element={<Videojuegos />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default App