import styled from "@emotion/styled"
import { useAuth } from "../hooks/useAuth"

const Pagina = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.grande};
  background: ${({ theme }) => theme.colors.negro};
  color: ${({ theme }) => theme.colors.blanco};
`

const Tarjeta = styled.div`
  max-width: 400px;
  margin-top: ${({ theme }) => theme.spacing.medio};
  padding: ${({ theme }) => theme.spacing.grande};
  background: ${({ theme }) => theme.colors.blanco};
  color: ${({ theme }) => theme.colors.negro};
  border-radius: ${({ theme }) => theme.radius.medio};
`

const Avatar = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.medio};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.azul};
  color: ${({ theme }) => theme.colors.blanco};
  font-size: 32px;
  font-weight: bold;
`

const Dato = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.poco};
`

function Perfil() {
  const { usuario } = useAuth()

  if (!usuario) {
    return (
      <Pagina>
        <h1>Perfil</h1>
        <p>Inicia sesión para ver tu perfil.</p>
      </Pagina>
    )
  }

  return (
    <Pagina>
      <h1>Perfil</h1>
      <Tarjeta>
        <Avatar>{usuario.nombre.charAt(0).toUpperCase()}</Avatar>
        <Dato><strong>Nombre:</strong> {usuario.nombre}</Dato>
        <Dato><strong>Email:</strong> {usuario.email}</Dato>
        <Dato><strong>Rol:</strong> {usuario.rol}</Dato>
      </Tarjeta>
    </Pagina>
  )
}

export default Perfil