import styled from "@emotion/styled"
import { useState } from "react"
import { useGet } from "../hooks/useGet"
import type { Videojuego } from "../types"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import { api } from "../services/api"

const Pagina = styled.div`
  min-height: 900px;
  padding: ${({ theme }) => theme.espaciado.medio};
  background: ${({ theme }) => theme.color.negro};
`

const Centro = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const Cabezera = styled.div`
  color: ${({ theme }) => theme.color.blanco};
`

const BarraSuperior = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Contenedor = styled.div`
  margin-top: ${({ theme }) => theme.espaciado.medio};
  overflow-x: auto;
  background: ${({ theme }) => theme.color.blanco};
  border-radius: ${({ theme }) => theme.radio_borde.medio};
`

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: ${({ theme }) => theme.color.negro};

  th {
    padding: ${({ theme }) => theme.espaciado.poco} ${({ theme }) => theme.espaciado.medio};
    text-align: left;
    color: ${({ theme }) => theme.color.gris};
    font-weight: normal;
  }

  td {
    padding: ${({ theme }) => theme.espaciado.poco} ${({ theme }) => theme.espaciado.medio};
    border-top: 1px solid ${({ theme }) => theme.color.gris};
  }

  td:first-of-type {
    font-weight: bold;
  }

  th:last-of-type,
  td:last-of-type {
    text-align: right;
  }
`

const Acciones = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.espaciado.poco};
`

const BotonAnadir = styled.button`
  padding: ${({ theme }) => theme.espaciado.poco} ${({ theme }) => theme.espaciado.medio};
  border: none;
  border-radius: ${({ theme }) => theme.radio_borde.poco};
  background: ${({ theme }) => theme.color.azul};
  color: ${({ theme }) => theme.color.blanco};
  cursor: pointer;
`

const BotonEditar = styled.button`
  padding: ${({ theme }) => theme.espaciado.poco};
  border: none;
  border-radius: ${({ theme }) => theme.radio_borde.poco};
  background: ${({ theme }) => theme.color.azul};
  color:  ${({ theme }) => theme.color.blanco};
  cursor: pointer;
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
  background: ${({ theme }) => theme.color.azul};
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

function Recursos() {
  const { datos, setDatos, cargando, error } = useGet<Videojuego[]>("/videojuegos");
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [errorEliminar, setErrorEliminar] = useState("")
  const [videojuegoAEliminar, setVideojuegoAEliminar] = useState<Videojuego | null>(null)

  if (cargando) return <p>Cargando videojuegos...</p>
  if (error) return <p>{error}</p>

  const videojuegos = datos ?? []

  async function eliminar() {
    if (!videojuegoAEliminar) return

    setErrorEliminar("")
    try {
      await api("/videojuegos/" + videojuegoAEliminar._id, { method: "DELETE" })
      setDatos(videojuegos.filter((videojuego) => videojuego._id !== videojuegoAEliminar._id))
    } catch (e) {
      setErrorEliminar(e instanceof Error ? e.message : "No se pudo eliminar el videojuego")
    } finally {
      setVideojuegoAEliminar(null)
    }
  }

  return (
    <Pagina>
      <Centro>
        <Cabezera>
          <h1>Videojuegos</h1>
          <p>Mostrando {videojuegos.length} videojuegos</p>
        </Cabezera>

        {usuario?.rol === "admin" && (
          <BarraSuperior>
            <BotonAnadir type="button" onClick={() => navigate("/videojuegos/nuevo")}>
              Añadir videojuego
            </BotonAnadir>
          </BarraSuperior>
        )}

        {errorEliminar && <MensajeError>{errorEliminar}</MensajeError>}

        {videojuegos.length === 0 && <p>No hay videojuegos</p>}

        <Contenedor>
          <Tabla>
            <thead>
              <tr>
                <th>Título</th>
                <th>Plataforma</th>
                <th>Género</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {videojuegos.map((videojuego) => (
                <tr key={videojuego._id}>
                  <td>{videojuego.name}</td>
                  <td>{videojuego.plataforma}</td>
                  <td>{videojuego.type}</td>
                  <td>
                    <Acciones>
                      {usuario?.rol === "admin" && (
                        <BotonEditar onClick={() => navigate("/videojuegos/" + videojuego._id + "/editar")}>Editar</BotonEditar>
                      )}
                      <BotonEliminar type="button" onClick={() => setVideojuegoAEliminar(videojuego)}>Eliminar</BotonEliminar>
                    </Acciones>
                  </td>
                </tr>
              ))}
            </tbody>
          </Tabla>
        </Contenedor>
      </Centro>

      {videojuegoAEliminar && (
        <Fondo>
          <Caja>
            <h2>Eliminar videojuego</h2>
            <p>¿Seguro que quieres eliminar "{videojuegoAEliminar.name}"?</p>
            <Acciones>
              <BotonCancelar type="button" onClick={() => setVideojuegoAEliminar(null)}>Cancelar</BotonCancelar>
              <BotonEliminar type="button" onClick={eliminar}>Eliminar</BotonEliminar>
            </Acciones>
          </Caja>
        </Fondo>
      )}
    </Pagina>
  )
}

export default Recursos