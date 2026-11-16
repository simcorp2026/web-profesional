"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CATEGORIAS, type Producto } from "@/data/productos"

type Props = {
  abierto: boolean
  onCerrar: () => void
  producto?: Producto | null // si viene, es edición
  onGuardar: (datos: Omit<Producto, "id">) => void
}

const vacio = { nombre: "", sku: "", precio: "", stock: "", categoria: CATEGORIAS[0] as string }

export function FormularioProducto({ abierto, onCerrar, producto, onGuardar }: Props) {
  return (
    <Dialog open={abierto} onOpenChange={(open) => !open && onCerrar()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{producto ? "Editar producto" : "Nuevo producto"}</DialogTitle>
        </DialogHeader>
        {/* key reinicia el estado del formulario al cambiar de producto */}
        <Campos key={producto?.id ?? "nuevo"} producto={producto} onGuardar={onGuardar} onCerrar={onCerrar} />
      </DialogContent>
    </Dialog>
  )
}

function Campos({
  producto,
  onGuardar,
  onCerrar,
}: Pick<Props, "producto" | "onGuardar" | "onCerrar">) {
  const [form, setForm] = useState(
    producto
      ? { ...producto, precio: String(producto.precio), stock: String(producto.stock) }
      : vacio
  )
  const [error, setError] = useState("")

  const cambiar = (campo: keyof typeof vacio) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [campo]: e.target.value })

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    const precio = Number(form.precio)
    const stock = Number(form.stock)
    if (!form.nombre.trim() || !form.sku.trim()) return setError("Nombre y SKU son obligatorios.")
    if (form.precio === "" || isNaN(precio) || precio < 0) return setError("Precio no válido.")
    if (form.stock === "" || !Number.isInteger(stock) || stock < 0) return setError("Stock debe ser un entero ≥ 0.")

    onGuardar({
      nombre: form.nombre.trim(),
      sku: form.sku.trim().toUpperCase(),
      precio,
      stock,
      categoria: form.categoria,
    })
    onCerrar()
  }

  return (
    <form onSubmit={enviar} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" value={form.nombre} onChange={cambiar("nombre")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="sku">SKU</Label>
        <Input id="sku" value={form.sku} onChange={cambiar("sku")} placeholder="ELE-1005" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="precio">Precio</Label>
          <Input id="precio" type="number" step="0.01" min="0" value={form.precio} onChange={cambiar("precio")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" type="number" step="1" min="0" value={form.stock} onChange={cambiar("stock")} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Categoría</Label>
        <Select value={form.categoria} onValueChange={(v) => v && setForm({ ...form, categoria: v as string })}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIAS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCerrar}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </DialogFooter>
    </form>
  )
}
