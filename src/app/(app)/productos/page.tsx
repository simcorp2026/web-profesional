"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FormularioProducto } from "@/components/formulario-producto"
import { TablaProductos } from "@/components/tabla-productos"
import type { Producto } from "@/data/productos"
import { useProductos } from "@/lib/productos-context"

export default function Productos() {
  const { productos, crear, editar, eliminar } = useProductos()
  const [busqueda, setBusqueda] = useState("")
  const [abierto, setAbierto] = useState(false)
  const [seleccionado, setSeleccionado] = useState<Producto | null>(null)

  const filtrados = productos.filter((p) =>
    `${p.nombre} ${p.sku} ${p.categoria}`.toLowerCase().includes(busqueda.toLowerCase())
  )

  const abrirNuevo = () => {
    setSeleccionado(null)
    setAbierto(true)
  }

  const abrirEdicion = (p: Producto) => {
    setSeleccionado(p)
    setAbierto(true)
  }

  const borrar = (p: Producto) => {
    if (confirm(`¿Eliminar "${p.nombre}"?`)) eliminar(p.id)
  }

  const guardar = (datos: Omit<Producto, "id">) =>
    seleccionado ? editar({ ...datos, id: seleccionado.id }) : crear(datos)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Productos</h1>
        <Button onClick={abrirNuevo}>
          <Plus /> Nuevo producto
        </Button>
      </div>

      <Input
        placeholder="Buscar por nombre, SKU o categoría…"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="max-w-sm"
      />

      <Card>
        <CardContent>
          <TablaProductos productos={filtrados} onEditar={abrirEdicion} onEliminar={borrar} />
        </CardContent>
      </Card>

      <FormularioProducto
        abierto={abierto}
        onCerrar={() => setAbierto(false)}
        producto={seleccionado}
        onGuardar={guardar}
      />
    </div>
  )
}
