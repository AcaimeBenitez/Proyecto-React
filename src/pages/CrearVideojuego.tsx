import styled from "@emotion/styled"
import { useState } from "react"
import { useNavigate } from "react-router"
import Formularios from "../componentes/Formularios"
import { api } from "../services/api"
import type { DatosVideojuego } from "../types"

const Pagina = styled.div`
  padding: ${({ theme }) => theme.espaciado.grande};
  color: ${({ theme }) => theme.color.blanco};
`

const MensajeError = styled.p`
  color: ${({ theme }) => theme.color.rojo};
`

function CrearVideojuego() {
  const navigate = useNavigate()
  const [errorGuardar, setErrorGuardar] = useState("")
  const [enviando, setEnviando] = useState(false)

  async function guardar(nuevo: DatosVideojuego) {
    setEnviando(true)
    setErrorGuardar("")
    try {
      await api("/videojuegos", {
        method: "POST",
        body: JSON.stringify(nuevo),
      })
      navigate("/videojuegos")
    } catch (e) {
      setErrorGuardar(e instanceof Error ? e.message : "No se pudo añadir el videojuego")
      setEnviando(false)
    }
  }

  return (
    <Pagina>
      <h1>Añadir videojuego</h1>
      {errorGuardar && <MensajeError>{errorGuardar}</MensajeError>}
      <Formularios
        onGuardar={guardar}
        onCancelar={() => navigate("/videojuegos")}
        enviando={enviando}
      />
    </Pagina>
  )
}

export default CrearVideojuego