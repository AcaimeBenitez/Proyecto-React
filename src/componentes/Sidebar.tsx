import styled from "@emotion/styled"
import { NavLink } from "react-router"

const Barra = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 220px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.negro};
  border-right: 1px solid ${({ theme }) => theme.colors.gris};
`

const Titulo = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.blanco};
  font-size: 1.25rem;
`

const Enlace = styled(NavLink)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.blanco};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.gris};
  }

  &.active {
    background: ${({ theme }) => theme.colors.azul};
  }
`

function Sidebar() {
  return (
    <Barra>
      <Titulo>Mi app</Titulo>
      <Enlace to="/" end>Inicio</Enlace>
      <Enlace to="/perfil">Perfil</Enlace>
    </Barra>
  )
}

export default Sidebar