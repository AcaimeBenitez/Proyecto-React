const BASE_URL = "http://localhost:3000"

export function getToken(): string | null {
  return sessionStorage.getItem("token")
}

export function setToken(token: string) {
  sessionStorage.setItem("token", token)
}

export function clearToken() {
  sessionStorage.removeItem("token")
}

export async function api<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const token = getToken()

  const cabeceras: Record<string, string> = {
    "Content-Type": "application/json",
  }
  if (token) {
    cabeceras.Authorization = "Bearer " + token
  }

  const respuesta = await fetch(BASE_URL + ruta, {
    method: opciones.method,
    body: opciones.body,
    signal: opciones.signal,
    headers: cabeceras,
  })

  if (respuesta.status === 401 && ruta !== "/users/login") {
    clearToken()
    window.location.href = "/login"
    throw new Error("Sesión caducada")
  }

  if (!respuesta.ok) {
    let mensaje = "Error en la petición"
    try {
      const datos = await respuesta.json()
      mensaje = datos.msg
    } catch {
    }
    throw new Error(mensaje)
  }

  if (respuesta.status === 204) {
    return null as T
  }

  return respuesta.json()
}