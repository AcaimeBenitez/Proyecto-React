import { useNavigate } from "react-router"

function NotFound() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Página no encontrada</h1>
      <p>La dirección que has escrito no existe.</p>
      <button onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  )
}

export default NotFound