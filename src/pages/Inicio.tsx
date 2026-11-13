import styled from "@emotion/styled"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { useGet } from "../hooks/useGet"
import type { Videojuego } from "../types"

const Pagina = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.negro};
  color: ${({ theme }) => theme.colors.blanco};
`
const Boton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.azul};
  color: white;
  cursor: pointer;
`

const BotonCancelar = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.rojo};
  color: ${({ theme }) => theme.colors.blanco};
  cursor: pointer;
`

const Resumen = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const Tarjeta = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.blanco};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const Numero = styled.p`
  margin: 0;
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.azul};
`

const Etiqueta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gris};
`

function Inicio() {
  const navigate = useNavigate()
  const { usuario, logout } = useAuth()
  const { datos: videojuegos } = useGet<Videojuego[]>("/videojuegos?limit=100")

  let zonaSesion

  if (usuario) {
    zonaSesion = (
      <>
        <p>Sesión iniciada como {usuario.nombre}</p>
        <BotonCancelar onClick={logout}>Cerrar sesión</BotonCancelar>
      </>
    )
  } else {
    zonaSesion = <Boton onClick={() => navigate("/login")}>Iniciar sesión</Boton>
  }

  return (
    <Pagina>
      <div>
        <h1>Bienvenido a Videojuegos</h1>

        {zonaSesion}

        <Resumen>
          <Tarjeta>
            <Numero>{videojuegos ? videojuegos.length : "..."}</Numero>
            <Etiqueta>Videojuegos</Etiqueta>
          </Tarjeta>
        </Resumen>
      </div>
    </Pagina>
  )
}

export default Inicio