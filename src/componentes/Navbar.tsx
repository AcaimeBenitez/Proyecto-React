import styled from "@emotion/styled"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

const Barra = styled.header`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }) => theme.espaciado.poco} ${({ theme }) => theme.espaciado.medio};
  background: ${({ theme }) => theme.color.blanco};
`

const BotonUsuario = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.espaciado.poco};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.color.negro};
  cursor: pointer;
`

const Avatar = styled.span`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.azul};
  color: ${({ theme }) => theme.color.blanco};
  font-weight: bold;
`

const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: ${({ theme }) => theme.espaciado.medio};
  display: flex;
  flex-direction: column;
  min-width: 160px;
  background: ${({ theme }) => theme.color.blanco};
  border-radius: ${({ theme }) => theme.radio_borde.poco};
`

const Opcion = styled.button`
  padding: ${({ theme }) => theme.espaciado.poco};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.color.negro};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.blanco};
  }
`

const BotonEntrar = styled.button`
  padding: ${({ theme }) => theme.espaciado.poco};
  border: none;
  border-radius: ${({ theme }) => theme.radio_borde.poco};
  background: ${({ theme }) => theme.color.azul};
  color: ${({ theme }) => theme.color.blanco};
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