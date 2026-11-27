import styled from "@emotion/styled"
import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

const Pagina = styled.div`
  min-height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.negro};
`

const Formulario = styled.form`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espaciado.medio};
  padding: ${({ theme }) => theme.espaciado.grande};
  background: ${({ theme }) => theme.color.blanco};
  border-radius: ${({ theme }) => theme.radio_borde.medio};
`

const Campo = styled.input`
  padding: ${({ theme }) => theme.espaciado.poco};
  border: 1px solid ${({ theme }) => theme.color.blanco};
  border-radius: ${({ theme }) => theme.radio_borde.poco};
`

const Boton = styled.button`
  padding: ${({ theme }) => theme.espaciado.poco};
  border: none;
  border-radius: ${({ theme }) => theme.radio_borde.poco};
  background: ${({ theme }) => theme.color.azul};
  color: white;
  cursor: pointer;
`

const MensajeError = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.color.rojo};
`

const BotonCancelar = styled.button`
  padding: ${({ theme }) => theme.espaciado.poco};
  border: none;
  border-radius: ${({ theme }) => theme.radio_borde.poco};
  background: ${({ theme }) => theme.color.rojo};
  color: ${({ theme }) => theme.color.blanco};
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