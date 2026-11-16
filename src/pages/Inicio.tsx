import styled from "@emotion/styled"
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

const Resumen = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.medio};
  margin-top: ${({ theme }) => theme.spacing.grande};
`

const Tarjeta = styled.div`
  padding: ${({ theme }) => theme.spacing.medio};
  background: ${({ theme }) => theme.colors.blanco};
  border-radius: ${({ theme }) => theme.radius.medio};
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
  const { datos: videojuegos } = useGet<Videojuego[]>("/videojuegos?limit=100")


  return (
    <Pagina>
      <div>
        <h1>Bienvenido a Videojuegos</h1>
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