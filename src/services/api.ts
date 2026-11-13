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

export async function api<T>(
  ruta: string,
  opciones: RequestInit = {},
): Promise<T> {
  const token = getToken()

  const respuesta = await fetch(`${BASE_URL}${ruta}`, {
    ...opciones,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers,
    },
  })

  if (respuesta.status === 401 && ruta !== "/users/login") {
    clearToken()
    throw new Error("Sesión caducada")
  }

  if (!respuesta.ok) {
    const datos = await respuesta.json().catch(() => null)
    throw new Error(datos?.msg ?? "Error en la petición")
  }

  if (respuesta.status === 204) {
    return undefined as T
  }

  return respuesta.json()
}