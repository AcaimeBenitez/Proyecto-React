import { Routes, Route } from "react-router"
import Layout from "./componentes/Layout"
import Inicio from "./pages/Inicio"
import Login from "./pages/Login"
import Perfil from "./pages/Perfil"
import Videojuegos from "./pages/Recursos"
import NotFound from "./pages/NotFound"
import Review from "./pages/Review"



function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/videojuegos" element={<Videojuegos />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/resenas" element={<Review />} />
      </Route>
    </Routes>
  )
}

export default App