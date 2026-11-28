import styled from "@emotion/styled"
import { useState } from "react"
import { useGet } from "../hooks/useGet"
import type { Review as ReviewTipo } from "../types"
import { api } from "../services/api"

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

const Acciones = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.espaciado.poco};
`

const BotonEliminar = styled.button`
  padding: ${({ theme }) => theme.espaciado.poco};
  border: none;
  border-radius: ${({ theme }) => theme.radio_borde.poco};
  background: ${({ theme }) => theme.color.rojo};
  color: ${({ theme }) => theme.color.blanco};
  cursor: pointer;
`

const BotonCancelar = styled.button`
  padding: ${({ theme }) => theme.espaciado.poco};
  border: none;
  border-radius: ${({ theme }) => theme.radio_borde.poco};
  background: ${({ theme }) => theme.color.gris};
  color: ${({ theme }) => theme.color.blanco};
  cursor: pointer;
`

const MensajeError = styled.p`
  color: ${({ theme }) => theme.color.rojo};
`

const Fondo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
`

const Caja = styled.div`
  width: 100%;
  max-width: 400px;
  padding: ${({ theme }) => theme.espaciado.grande};
  background: ${({ theme }) => theme.color.blanco};
  color: ${({ theme }) => theme.color.negro};
  border-radius: ${({ theme }) => theme.radio_borde.medio};
  text-align: center;
`

function Review() {
  const { datos, setDatos, cargando, error } = useGet<ReviewTipo[]>("/reviews?limit=100")
  const [errorEliminar, setErrorEliminar] = useState("")
  const [reviewAEliminar, setReviewAEliminar] = useState<ReviewTipo | null>(null)

  if (cargando) return <Pagina><p>Cargando reseñas...</p></Pagina>
  if (error) return <Pagina><p>{error}</p></Pagina>

  const lista = datos ?? []

  async function eliminar() {
    if (!reviewAEliminar) return

    setErrorEliminar("")
    try {
      await api("/reviews/" + reviewAEliminar._id, { method: "DELETE" })
      setDatos(lista.filter((r) => r._id !== reviewAEliminar._id))
    } catch (e) {
      setErrorEliminar(e instanceof Error ? e.message : "No se pudo eliminar la reseña")
    } finally {
      setReviewAEliminar(null)
    }
  }

  return (
    <Pagina>
      <h1>Reseñas</h1>
      <p>Mostrando {lista.length} reseñas</p>

      {errorEliminar && <MensajeError>{errorEliminar}</MensajeError>}

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
            <Acciones>
              <BotonEliminar type="button" onClick={() => setReviewAEliminar(r)}>Eliminar</BotonEliminar>
            </Acciones>
          </Tarjeta>
        ))}
      </Grid>

      {reviewAEliminar && (
        <Fondo>
          <Caja>
            <h2>Eliminar reseña</h2>
            <p>¿Seguro que quieres eliminar la reseña de "{reviewAEliminar.videojuego.name}"?</p>
            <Acciones>
              <BotonCancelar type="button" onClick={() => setReviewAEliminar(null)}>Cancelar</BotonCancelar>
              <BotonEliminar type="button" onClick={eliminar}>Eliminar</BotonEliminar>
            </Acciones>
          </Caja>
        </Fondo>
      )}
    </Pagina>
  )
}

export default Review