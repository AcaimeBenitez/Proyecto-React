import styled from "@emotion/styled"
import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

const Pagina = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.negro};
`

const Formulario = styled.form`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.blanco};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const Campo = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid #d1d5db;
  border-radius: ${({ theme }) => theme.radius.sm};
`

const Boton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.azul};
  color: white;
  cursor: pointer;
`

const MensajeError = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.rojo};
`

const BotonCancelar = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.rojo};
  color: ${({ theme }) => theme.colors.blanco};
  cursor: pointer;
`

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login } = useAuth()
    const [enviando, setEnviando] = useState(false)
    const navigate = useNavigate()

    async function enviar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (email.trim() === "" || password === "") {
            setError("Introduce el email y la contraseña")
            return
        }

        setEnviando(true)
        setError("")
        try {
            await login(email.trim(), password)
            navigate("/")
        } catch (e) {
            setError(e instanceof Error ? e.message : "No se pudo conectar con el servidor")
        } finally {
            setEnviando(false)
        }
    }

    return (
        <Pagina>
            <Formulario onSubmit={enviar}>
                <h1>Iniciar sesión</h1>
                <Campo
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <Campo
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />
                {error && <MensajeError>{error}</MensajeError>}
                <Boton type="submit" disabled={enviando}>
                    {enviando ? "Entrando..." : "Entrar"}
                </Boton>
                <BotonCancelar type="button" onClick={() => navigate("/")}>
                    Cancelar
                </BotonCancelar>
            </Formulario>
        </Pagina>
    )
}

export default Login