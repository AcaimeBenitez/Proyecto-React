import styled from "@emotion/styled"
import { useGet } from "../hooks/useGet"
import type { Videojuego } from "../types"

const Pagina = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.negro};
`

const Centro = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const Cabezera = styled.div`
  color: ${({ theme }) => theme.colors.blanco};
`

const Contenedor = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.blanco};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.negro};

  th {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    text-align: left;
    color: ${({ theme }) => theme.colors.gris};
    font-weight: normal;
  }

  td {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-top: 1px solid ${({ theme }) => theme.colors.gris};
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
  gap: ${({ theme }) => theme.spacing.sm};
`

const BotonEditar = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.azul};
  color: white;
  cursor: pointer;
`

const BotonEliminar = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.rojo};
  color: ${({ theme }) => theme.colors.blanco};
  cursor: pointer;
`
function Recursos() {
  const { datos, cargando, error } = useGet<Videojuego[]>("/videojuegos")

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
              {videojuegos.map((v) => (
                <tr key={v._id}>
                  <td>{v.name}</td>
                  <td>{v.plataforma}</td>
                  <td>{v.type}</td>
                  <td>
                    <Acciones>
                      <BotonEditar type="button">Editar</BotonEditar>
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