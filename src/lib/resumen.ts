import { CATEGORIAS, UMBRAL_STOCK_BAJO, type Producto } from "@/data/productos"

// Cifras derivadas del catálogo, compartidas por el dashboard y el preview de la portada.
export function resumirInventario(productos: Producto[]) {
  const valorTotal = productos.reduce((suma, p) => suma + p.precio * p.stock, 0)

  const porCategoria = CATEGORIAS.map((categoria) => {
    const valor = productos
      .filter((p) => p.categoria === categoria)
      .reduce((suma, p) => suma + p.precio * p.stock, 0)
    return { categoria, valor: Math.round(valor) }
  })

  const mayor = porCategoria.reduce((a, b) => (b.valor > a.valor ? b : a), porCategoria[0])

  const porReponer = productos
    .filter((p) => p.stock <= UMBRAL_STOCK_BAJO)
    .sort((a, b) => a.stock - b.stock)

  return {
    totalProductos: productos.length,
    valorTotal,
    porCategoria,
    mayor,
    cuotaMayor: valorTotal > 0 ? Math.round((mayor.valor / valorTotal) * 100) : 0,
    porReponer,
  }
}
