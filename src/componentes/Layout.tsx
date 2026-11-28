import styled from "@emotion/styled"
import { Outlet } from "react-router"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const Contenedor = styled.div`
  min-height: 900px;
  background: ${({ theme }) => theme.color.negro};
`

const Contenido = styled.main`
  margin-left: 220px;
`

function Layout() {
  return (
    <Contenedor>
      <Sidebar />
      <Contenido>
        <Navbar />
        <Outlet />
      </Contenido>
    </Contenedor>
  )
}

export default Layout