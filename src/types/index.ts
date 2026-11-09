export type Rol = "usuario" | "admin"

export interface Usuario {
  _id: string
  email: string
  nombre: string
  rol: Rol
}

export interface Videojuego {
  _id: string
  name: string
  plataforma: string
  type: string
}