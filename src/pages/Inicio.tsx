import styled from "@emotion/styled"
import { useNavigate } from "react-router"

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
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const Tarjeta = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.blanco};
  border-radius: ${({ theme }) => theme.radius.md};
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
    const navigate = useNavigate()
    return (
        <Pagina>
            <div>
                <h1>Bienvenido a Videojuegos</h1>
                <p>Aquí podrás consultar el catálogo y publicar tus reseñas.</p>
                <button onClick={() => navigate("/login")}>Iniciar sesión</button>
                <p>Aquí podrás consultar el catálogo y publicar tus reseñas.</p>

                <Resumen>
                    <Tarjeta>
                        <Numero>0</Numero>
                        <Etiqueta>Videojuegos</Etiqueta>
                    </Tarjeta>
                    <Tarjeta>
                        <Numero>0</Numero>
                        <Etiqueta>Reseñas</Etiqueta>
                    </Tarjeta>
                </Resumen>
            </div>
        </Pagina>
    )
}

export default Inicio