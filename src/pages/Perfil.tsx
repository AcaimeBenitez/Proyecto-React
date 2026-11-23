import styled from "@emotion/styled"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

const Pagina = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.grande};
  background: ${({ theme }) => theme.colors.negro};
  color: ${({ theme }) => theme.colors.blanco};
`

const Tarjeta = styled.div`
  max-width: 400px;
  margin-top: ${({ theme }) => theme.spacing.medio};
  padding: ${({ theme }) => theme.spacing.grande};
  background: ${({ theme }) => theme.colors.blanco};
  color: ${({ theme }) => theme.colors.negro};
  border-radius: ${({ theme }) => theme.radius.medio};
  text-align: center;
`

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.poco};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.azul};
  color: ${({ theme }) => theme.colors.blanco};
  font-size: 36px;
  font-weight: bold;
`

const Nombre = styled.h2`
  margin: 0;
`

const Etiqueta = styled.span`
  display: inline-block;
  margin: ${({ theme }) => theme.spacing.poco} 0 ${({ theme }) => theme.spacing.medio};
  padding: 2px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.azul};
  color: ${({ theme }) => theme.colors.blanco};
  font-size: 14px;
`

const Fila = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.poco} 0;
  border-top: 1px solid #e5e7eb;

  span:first-of-type {
    color: ${({ theme }) => theme.colors.gris};
  }
`

const Boton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.medio};
  padding: ${({ theme }) => theme.spacing.poco} ${({ theme }) => theme.spacing.medio};
  border: none;
  border-radius: ${({ theme }) => theme.radius.medio};
  background: ${({ theme }) => theme.colors.azul};
  color: ${({ theme }) => theme.colors.blanco};
  cursor: pointer;
`

function Perfil() {
  const { usuario } = useAuth()
  const navigate = useNavigate()

  if (!usuario) {
    return (
      <Pagina>
        <h1>Perfil</h1>
        <p>Inicia sesión para ver tu perfil.</p>
        <Boton onClick={() => navigate("/login")}>Iniciar sesión</Boton>
      </Pagina>
    )
  }

  return (
    <Pagina>
      <h1>Perfil</h1>
      <Tarjeta>
        <Avatar>{usuario.nombre.charAt(0).toUpperCase()}</Avatar>
        <Nombre>{usuario.nombre}</Nombre>
        <Etiqueta>{usuario.rol === "admin" ? "Administrador" : "Usuario"}</Etiqueta>

        <Fila>
          <span>Nombre</span>
          <span>{usuario.nombre}</span>
        </Fila>
        <Fila>
          <span>Email</span>
          <span>{usuario.email}</span>
        </Fila>
        <Fila>
          <span>Rol</span>
          <span>{usuario.rol}</span>
        </Fila>

        <Boton onClick={() => navigate("/")}>Volver al inicio</Boton>
      </Tarjeta>
    </Pagina>
  )
}

export default Perfil