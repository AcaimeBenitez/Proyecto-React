import styled from "@emotion/styled"
import { useGet } from "../hooks/useGet"
import type { Videojuego } from "../types"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

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
function Recursos() {
  const { datos, cargando, error } = useGet<Videojuego[]>("/videojuegos");
  const navigate = useNavigate();
  const { usuario } = useAuth();

  if (cargando) return <p>Cargando videojuegos...</p>
  if (error) return <p>{error}</p>

  const videojuegos = datos ?? []

  return (
    <Pagina>
      <Centro>
        <Cabezera>
          <h1>Videojuegos</h1>
          <p>Mostrando {videojuegos.length} videojuegos</p>
        </Cabezera>

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
                      <BotonEliminar type="button">Eliminar</BotonEliminar>
                    </Acciones>
                  </td>
                </tr>
              ))}
            </tbody>
          </Tabla>
        </Contenedor>
      </Centro>
    </Pagina>
  )
}

export default Recursos