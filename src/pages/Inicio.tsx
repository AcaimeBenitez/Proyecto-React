import styled from "@emotion/styled"
import { useGet } from "../hooks/useGet"
import type { Videojuego } from "../types"

const Pagina = styled.div`
  min-height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.negro};
  color: ${({ theme }) => theme.color.blanco};
`

const Resumen = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.espaciado.medio};
  margin-top: ${({ theme }) => theme.espaciado.grande};
`

const Tarjeta = styled.div`
  padding: ${({ theme }) => theme.espaciado.medio};
  background: ${({ theme }) => theme.color.blanco};
  border-radius: ${({ theme }) => theme.radio_borde.medio};
`

const Numero = styled.p`
  margin: 0;
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.azul};
`

const Etiqueta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.color.gris};
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