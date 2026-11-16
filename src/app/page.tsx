import Link from "next/link"
import { BarChart3, Boxes, PackageCheck } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { EtiquetaSku } from "@/components/etiqueta-sku"
import { Stock } from "@/components/stock"
import { formatoMoneda, productosIniciales, UMBRAL_STOCK_BAJO } from "@/data/productos"
import { resumirInventario } from "@/lib/resumen"
import { cn } from "@/lib/utils"

const funciones = [
  {
    icono: Boxes,
    titulo: "Catálogo centralizado",
    descripcion: "Nombre, SKU, precio, stock y categoría de cada producto, editables desde una sola tabla",
  },
  {
    icono: PackageCheck,
    titulo: "Alertas de stock bajo",
    descripcion: `Todo producto con ${UMBRAL_STOCK_BAJO} unidades o menos queda marcado en la tabla y en la lista de reposición`,
  },
  {
    icono: BarChart3,
    titulo: "Métricas del inventario",
    descripcion: "El valor total de lo que tienes en bodega, en dólares, y cómo se reparte por categoría",
  },
]

const botonHero = "h-11 rounded-[10px] px-5 text-[15px]"

// Vista previa del dashboard, con las cifras reales del catálogo de ejemplo.
function VistaPrevia() {
  const r = resumirInventario(productosIniciales)
  const maximo = Math.max(...r.porCategoria.map((c) => c.valor))
  const categorias = [...r.porCategoria].sort((a, b) => b.valor - a.valor)

  return (
    <div className="rounded-[20px] bg-card p-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-foreground/8">
      <div className="flex h-9 items-center justify-between px-3">
        <span className="text-[13px] font-medium">Resumen del inventario</span>
        <span className="font-mono text-[11px] text-muted-foreground">{r.totalProductos} productos</span>
      </div>

      <div className="grid gap-2 sm:grid-cols-[1.15fr_1fr]">
        <div className="rounded-xl bg-background p-4 ring-1 ring-foreground/6">
          <p className="text-xs text-texto-secundario">Valor del inventario</p>
          <p className="cifra mt-2 text-[28px] leading-none font-medium tracking-tight">{formatoMoneda(r.valorTotal)}</p>

          <ul className="mt-5 space-y-3">
            {categorias.map((c) => {
              const lider = c.categoria === r.mayor.categoria
              return (
                <li key={c.categoria}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className={lider ? "text-foreground" : "text-texto-secundario"}>{c.categoria}</span>
                    <span className="cifra font-mono text-[11px] text-muted-foreground">{formatoMoneda(c.valor).replace(/,\d+$/, "")}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-foreground/6">
                    <div
                      className={cn("h-full rounded-full", lider ? "bg-marca" : "bg-chart-2")}
                      style={{ width: `${(c.valor / maximo) * 100}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="hidden rounded-xl bg-background p-4 ring-1 ring-foreground/6 sm:block">
          <div className="flex items-baseline justify-between">
            <p className="text-xs text-texto-secundario">Por reponer</p>
            <span className="font-mono text-[11px] text-muted-foreground">{r.porReponer.length}</span>
          </div>
          <ul className="mt-2">
            {r.porReponer.slice(0, 5).map((p) => (
              <li key={p.id} className="flex h-[52px] items-center gap-2 [&+li]:border-t [&+li]:border-border">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs">{p.nombre}</p>
                  <EtiquetaSku sku={p.sku} className="mt-1 h-4 px-1 text-[11px]" />
                </div>
                <Stock unidades={p.stock} className="text-xs" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Portada() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
          <span className="text-[15px] font-medium tracking-tight">GestionaProductosEc</span>
          <Link href="/dashboard" className={buttonVariants({ variant: "outline", className: "h-9 px-4" })}>
            Entrar
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 md:px-8 lg:min-h-[min(calc(100svh-56px),800px)] lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-24">
          <div className="entrada">
            <h1 className="max-w-[14ch] text-[40px] leading-[1.06] font-medium tracking-[-0.02em] sm:text-[56px] sm:tracking-[-0.03em]">
              Sabe qué hay en tu bodega y qué toca reponer
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-[1.6] text-texto-secundario">
              GestionaProductosEc lleva el catálogo de tu tienda con SKU, precio, stock y categoría, marca lo que baja de{" "}
              {UMBRAL_STOCK_BAJO} unidades y suma el valor de tu inventario en dólares.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className={buttonVariants({ className: botonHero })}>
                Ir al dashboard
              </Link>
              <Link href="/productos" className={buttonVariants({ variant: "outline", className: botonHero })}>
                Ver productos
              </Link>
            </div>
          </div>

          <div className="entrada [animation-delay:60ms]">
            <VistaPrevia />
          </div>
        </section>

        {/* Funciones principales */}
        <section className="border-t border-border">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-3 sm:gap-8 md:px-8 md:py-24">
            {funciones.map(({ icono: Icono, titulo, descripcion }) => (
              <div key={titulo}>
                <Icono className="size-[18px] text-muted-foreground" strokeWidth={1.5} />
                <h2 className="mt-4 text-[15px] font-medium">{titulo}</h2>
                <p className="mt-2 max-w-[32ch] text-sm leading-[1.6] text-texto-secundario">{descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 sm:flex-row sm:items-center md:px-8">
            <div>
              <h2 className="text-2xl font-medium tracking-tight">Empieza por tu catálogo</h2>
              <p className="mt-2 text-texto-secundario">Cada producto que cargas actualiza las alertas y el valor del inventario</p>
            </div>
            <Link href="/productos" className={buttonVariants({ className: botonHero })}>
              Gestionar productos
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-4 py-6 text-[13px] text-muted-foreground sm:flex-row md:px-8">
          <span>© 2026 GestionaProductosEc</span>
          <span>Proyecto demo · Next.js + Tailwind + shadcn/ui</span>
        </div>
      </footer>
    </div>
  )
}
