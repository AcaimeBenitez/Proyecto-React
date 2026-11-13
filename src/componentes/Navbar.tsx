import styled from "@emotion/styled"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

const Barra = styled.header`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.blanco};
`

const BotonUsuario = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.negro};
  cursor: pointer;
`

const Avatar = styled.span`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.azul};
  color: ${({ theme }) => theme.colors.blanco};
  font-weight: bold;
`

const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  min-width: 160px;
  background: ${({ theme }) => theme.colors.blanco};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`

const Opcion = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.negro};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.blanco};
  }
`

const BotonEntrar = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.azul};
  color: ${({ theme }) => theme.colors.blanco};
  cursor: pointer;
`

function Navbar() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const [abierto, setAbierto] = useState(false)

  function irAPerfil() {
    setAbierto(false)
    navigate("/perfil")
  }

  function cerrarSesion() {
    setAbierto(false)
    logout()
    navigate("/login")
  }

  if (!usuario) {
    return (
      <Barra>
        <BotonEntrar onClick={() => navigate("/login")}>Iniciar sesión</BotonEntrar>
      </Barra>
    )
  }

  return (
    <Barra>
      <BotonUsuario onClick={() => setAbierto(!abierto)}>
        <Avatar>{usuario.nombre.charAt(0).toUpperCase()}</Avatar>
        {usuario.nombre}
      </BotonUsuario>

      {abierto && (
        <Menu>
          <Opcion onClick={irAPerfil}>Perfil</Opcion>
          <Opcion onClick={cerrarSesion}>Cerrar sesión</Opcion>
        </Menu>
      )}
    </Barra>
  )
}

export default Navbar