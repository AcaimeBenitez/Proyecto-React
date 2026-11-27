import styled from "@emotion/styled"
import { useGet } from "../hooks/useGet"
import type { Review as ReviewTipo } from "../types"

const Pagina = styled.div`
  min-height: 900px;
  padding: ${({ theme }) => theme.espaciado.medio};
  background: ${({ theme }) => theme.color.negro};
  color: ${({ theme }) => theme.color.blanco};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${({ theme }) => theme.espaciado.medio};
  margin-top: ${({ theme }) => theme.espaciado.medio};
`

const Tarjeta = styled.div`
  padding: ${({ theme }) => theme.espaciado.medio};
  background: ${({ theme }) => theme.color.blanco};
  color: ${({ theme }) => theme.color.negro};
  border-radius: ${({ theme }) => theme.radio_borde.medio};

  h3 {
    margin: 0 0 ${({ theme }) => theme.espaciado.poco};
  }

  p {
    margin: 0 0 ${({ theme }) => theme.espaciado.poco};
  }
`

const Estrellas = styled.p`
  color: ${({ theme }) => theme.color.azul};
  font-size: 20px;
`

const Autor = styled.p`
  color: ${({ theme }) => theme.color.gris};
`

function Review() {
  const { datos, cargando, error } = useGet<ReviewTipo[]>("/reviews?limit=100")

  if (cargando) return <Pagina><p>Cargando reseñas...</p></Pagina>
  if (error) return <Pagina><p>{error}</p></Pagina>

  const lista = datos ?? []

  return (
    <Pagina>
      <h1>Reseñas</h1>
      <p>Mostrando {lista.length} reseñas</p>

      {lista.length === 0 && <p>No hay reseñas</p>}

      <Grid>
        {lista.map((r) => (
          <Tarjeta key={r._id}>
            <h3>{r.videojuego.name}</h3>
            <Estrellas>
              {"★".repeat(r.puntuacion)}
              {"☆".repeat(5 - r.puntuacion)}
            </Estrellas>
            {r.comentario && <p>{r.comentario}</p>}
            <Autor>Por {r.usuario.nombre}</Autor>
          </Tarjeta>
        ))}
      </Grid>
    </Pagina>
  )
}

export default Review