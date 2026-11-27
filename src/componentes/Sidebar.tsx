import styled from "@emotion/styled"
import { NavLink } from "react-router"

const Barra = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 220px;
  height: 900px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espaciado.poco};
  padding: ${({ theme }) => theme.espaciado.medio};
  background: ${({ theme }) => theme.color.negro};
  border-right: 1px solid ${({ theme }) => theme.color.gris};
`

const Titulo = styled.h1`
  margin: 0 0 ${({ theme }) => theme.espaciado.medio};
  color: ${({ theme }) => theme.color.blanco};
  font-size: 1.25rem;
`

const Enlace = styled(NavLink)`
  padding: ${({ theme }) => theme.espaciado.poco} ${({ theme }) => theme.espaciado.medio};
  border-radio_borde: ${({ theme }) => theme.radio_borde.poco};
  color: ${({ theme }) => theme.color.blanco};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.color.gris};
  }

  &.active {
    background: ${({ theme }) => theme.color.azul};
  }
`

function Sidebar() {
  return (
    <Barra>
      <Titulo>Videojuegos Api</Titulo>
      <Enlace to="/" end>Inicio</Enlace>
      <Enlace to="/perfil">Perfil</Enlace>
      <Enlace to="/videojuegos">Videojuegos</Enlace>
      <Enlace to="/resenas">Reseñas</Enlace>
    </Barra>
  )
}

export default Sidebar