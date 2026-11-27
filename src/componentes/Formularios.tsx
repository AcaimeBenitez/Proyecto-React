import styled from "@emotion/styled"
import { useState } from "react"
import type { FormEvent } from "react"
import type { DatosVideojuego } from "../types"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espaciado.medio};
  max-width: 400px;
  padding: ${({ theme }) => theme.espaciado.grande};
  background: ${({ theme }) => theme.color.blanco};
  color: ${({ theme }) => theme.color.negro};
  border-radius: ${({ theme }) => theme.radio_borde.medio};
`

const Campo = styled.input`
  padding: ${({ theme }) => theme.espaciado.poco};
  border: 1px solid ${({ theme }) => theme.color.blanco};
  border-radius: ${({ theme }) => theme.radio_borde.medio};
`

const Acciones = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.espaciado.poco};
  color: ${({ theme }) => theme.color.blanco};
`

const Boton = styled.button`
  padding: ${({ theme }) => theme.espaciado.poco} ${({ theme }) => theme.espaciado.medio};
  border: none;
  border-radius: ${({ theme }) => theme.radio_borde.medio};
  background: ${({ theme }) => theme.color.azul};
  color: ${({ theme }) => theme.color.blanco};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const BotonCancelar = styled(Boton)`
  background: ${({ theme }) => theme.color.rojo};
`

const MensajeError = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.color.rojo};
`

interface FormularioProps {
  onGuardar: (datos: DatosVideojuego) => void
  onCancelar: () => void
  inicial?: DatosVideojuego
  enviando?: boolean
}

function Formularios({ onGuardar, onCancelar, inicial, enviando }: FormularioProps) {
  const [name, setName] = useState(inicial ? inicial.name : "")
  const [plataforma, setPlataforma] = useState(inicial ? inicial.plataforma : "")
  const [type, setType] = useState(inicial ? inicial.type : "")
  const [error, setError] = useState("")

  function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (name.trim() === "" || plataforma.trim() === "" || type.trim() === "") {
      setError("Todos los campos son obligatorios")
      return
    }

    setError("")
    onGuardar({
      name: name.trim(),
      plataforma: plataforma.trim(),
      type: type.trim(),
    })
  }

  return (
    <Form onSubmit={enviar}>
      <Campo
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        maxLength={100}
      />
      <Campo
        value={plataforma}
        onChange={(e) => setPlataforma(e.target.value)}
        placeholder="Plataforma"
        maxLength={100}
      />
      <Campo
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Tipo (Aventura, RPG...)"
        maxLength={100}
      />

      {error && <MensajeError>{error}</MensajeError>}

      <Acciones>
        <Boton type="submit" disabled={enviando}>
          {enviando ? "Guardando..." : "Guardar"}
        </Boton>
        <BotonCancelar type="button" onClick={onCancelar}>
          Cancelar
        </BotonCancelar>
      </Acciones>
    </Form>
  )
}

export default Formularios