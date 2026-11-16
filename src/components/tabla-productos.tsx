"use client"

import { Pencil, Trash2 } from "lucide-react"
import { EtiquetaSku } from "@/components/etiqueta-sku"
import { Stock } from "@/components/stock"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatoMoneda, type Producto } from "@/data/productos"

type Props = {
  productos: Producto[]
  onEditar?: (producto: Producto) => void
  onEliminar?: (producto: Producto) => void
}

export function TablaProductos({ productos, onEditar, onEliminar }: Props) {
  const conAcciones = Boolean(onEditar || onEliminar)

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Nombre</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead className="text-right">Precio</TableHead>
          <TableHead className="text-right">Stock</TableHead>
          {conAcciones && <TableHead className="text-right">Acciones</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {productos.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-muted-foreground">
              No hay productos
            </TableCell>
          </TableRow>
        )}
        {productos.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="font-medium">{p.nombre}</TableCell>
            <TableCell>
              <EtiquetaSku sku={p.sku} />
            </TableCell>
            <TableCell className="text-texto-secundario">{p.categoria}</TableCell>
            <TableCell className="cifra text-right">{formatoMoneda(p.precio)}</TableCell>
            <TableCell className="text-right">
              <Stock unidades={p.stock} />
            </TableCell>
            {conAcciones && (
              <TableCell className="text-right">
                {onEditar && (
                  <Button variant="ghost" size="icon-sm" aria-label="Editar" onClick={() => onEditar(p)}>
                    <Pencil />
                  </Button>
                )}
                {onEliminar && (
                  <Button variant="ghost" size="icon-sm" aria-label="Eliminar" onClick={() => onEliminar(p)}>
                    <Trash2 />
                  </Button>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
