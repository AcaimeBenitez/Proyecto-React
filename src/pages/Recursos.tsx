import styled from "@emotion/styled"
import { useState } from "react"
import type { Videojuego } from "../types"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`

const Tarjeta = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.blanco};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing.sm};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.gris};
  }
`

const ejemplo: Videojuego[] = [
  { _id: "1", name: "Zelda", plataforma: "Switch", type: "Aventura" },
  { _id: "2", name: "FIFA", plataforma: "PS5", type: "Deportes" },
  { _id: "3", name: "Halo", plataforma: "Xbox", type: "Shooter" },
]

function Recursos() {
  const [videojuegos] = useState<Videojuego[]>(ejemplo)

  return (
    <div>
      <h1>Videojuegos</h1>
      <p>Mostrando {videojuegos.length} videojuegos</p>

      <Grid>
        {videojuegos.map((v) => (
          <Tarjeta key={v._id}>
            <h3>{v.name}</h3>
            <p>{v.plataforma}</p>
            <p>{v.type}</p>
          </Tarjeta>
        ))}
      </Grid>
    </div>
  )
}

export default Recursos