import { createContext, useState } from "react"
import type { ReactNode } from "react"
import { api, setToken, clearToken } from "../services/api"
import type { LoginRespuesta, Usuario } from "../types"

interface AuthContextType {
  usuario: Usuario | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  async function login(email: string, password: string) {
    const datos = await api<LoginRespuesta>("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    setToken(datos.token)
    setUsuario(datos.usuario)
  }

  function logout() {
    clearToken()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}