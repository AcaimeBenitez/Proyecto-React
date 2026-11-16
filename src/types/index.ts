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

export interface LoginRespuesta {
  msg: string
  token: string
  usuario: Usuario
}

export interface Review {
  _id: string
  usuario: { _id: string; nombre: string }
  videojuego: { _id: string; name: string; plataforma: string }
  puntuacion: number
  comentario?: string
  createdAt: string
}