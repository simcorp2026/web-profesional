"use client"

import { createContext, useContext, useState } from "react"
import { productosIniciales, type Producto } from "@/data/productos"

type ProductosContexto = {
  productos: Producto[]
  crear: (datos: Omit<Producto, "id">) => void
  editar: (producto: Producto) => void
  eliminar: (id: string) => void
}

const Contexto = createContext<ProductosContexto | null>(null)

export function ProductosProvider({ children }: { children: React.ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales)

  const crear = (datos: Omit<Producto, "id">) =>
    setProductos((prev) => [...prev, { ...datos, id: crypto.randomUUID() }])

  const editar = (producto: Producto) =>
    setProductos((prev) => prev.map((p) => (p.id === producto.id ? producto : p)))

  const eliminar = (id: string) =>
    setProductos((prev) => prev.filter((p) => p.id !== id))

  return (
    <Contexto.Provider value={{ productos, crear, editar, eliminar }}>
      {children}
    </Contexto.Provider>
  )
}

export function useProductos() {
  const ctx = useContext(Contexto)
  if (!ctx) throw new Error("useProductos debe usarse dentro de ProductosProvider")
  return ctx
}
