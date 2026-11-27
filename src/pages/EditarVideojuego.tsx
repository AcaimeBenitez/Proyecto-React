import styled from "@emotion/styled"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import Formularios from "../componentes/Formularios"
import { useGet } from "../hooks/useGet"
import { api } from "../services/api"
import type { DatosVideojuego, Videojuego } from "../types"

const Pagina = styled.div`
  padding: ${({ theme }) => theme.espaciado.grande};
  color: ${({ theme }) => theme.color.blanco};
`

const MensajeError = styled.p`
  color: ${({ theme }) => theme.color.rojo};
`

function EditarVideojuego() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { datos, cargando, error } = useGet<Videojuego>("/videojuegos/" + id)
  const [errorGuardar, setErrorGuardar] = useState("")
  const [enviando, setEnviando] = useState(false)

  async function guardar(nuevos: DatosVideojuego) {
    setEnviando(true)
    setErrorGuardar("")
    try {
      await api("/videojuegos/" + id, {
        method: "PUT",
        body: JSON.stringify(nuevos),
      })
      navigate("/videojuegos")
    } catch (e) {
      setErrorGuardar(e instanceof Error ? e.message : "No se pudieron guardar los cambios")
      setEnviando(false)
    }
  }

  if (cargando) return <Pagina><p>Cargando videojuego...</p></Pagina>
  if (error) return <Pagina><MensajeError>{error}</MensajeError></Pagina>
  if (!datos) return <Pagina><p>El videojuego no existe</p></Pagina>

  return (
    <Pagina>
      <h1>Editar videojuego</h1>
      {errorGuardar && <MensajeError>{errorGuardar}</MensajeError>}
      <Formularios
        inicial={datos}
        onGuardar={guardar}
        onCancelar={() => navigate("/videojuegos")}
        enviando={enviando}
      />
    </Pagina>
  )
}

export default EditarVideojuego