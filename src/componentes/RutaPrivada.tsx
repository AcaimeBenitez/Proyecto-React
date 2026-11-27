import { Navigate, Outlet } from "react-router"
import { useAuth } from "../hooks/useAuth"

function RutaPrivada() {
  const { usuario } = useAuth()

  if (!usuario) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default RutaPrivada