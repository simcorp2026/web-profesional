"use client"

import Link from "next/link"
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { EtiquetaSku } from "@/components/etiqueta-sku"
import { Stock } from "@/components/stock"
import { TablaProductos } from "@/components/tabla-productos"
import { CATEGORIAS, formatoMoneda, UMBRAL_STOCK_BAJO } from "@/data/productos"
import { useProductos } from "@/lib/productos-context"
import { resumirInventario } from "@/lib/resumen"

const configGrafico = {
  valor: { label: "Valor", color: "var(--chart-1)" },
} satisfies ChartConfig

const ejeDolares = (v: number) => (v === 0 ? "$0" : `$${(v / 1000).toLocaleString("es-EC")}k`)

function Panel({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <section className={`rounded-2xl bg-card ring-1 ring-foreground/8 ${className}`}>{children}</section>
}

export default function Dashboard() {
  const { productos } = useProductos()
  const r = resumirInventario(productos)

  return (
    <div className="entrada space-y-6">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-[28px] leading-tight font-medium tracking-tight">Resumen del inventario</h1>
        <p className="font-mono text-xs text-muted-foreground">
          {r.totalProductos} productos · {CATEGORIAS.length} categorías
        </p>
      </header>

      {/* Métricas: el valor del inventario es la cifra que manda */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Panel className="p-5 sm:col-span-2">
          <p className="text-[13px] text-texto-secundario">Valor del inventario</p>
          <p className="cifra mt-3 text-[40px] leading-none font-medium tracking-tight">
            {formatoMoneda(r.valorTotal)}
          </p>
          <p className="mt-3 text-[13px] text-muted-foreground">Precio × stock de todo el catálogo, en dólares</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-texto-secundario">Total de productos</p>
          <p className="cifra mt-3 text-[32px] leading-none font-medium">{r.totalProductos}</p>
          <p className="mt-3 text-[13px] text-muted-foreground">En {CATEGORIAS.length} categorías</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-texto-secundario">Stock bajo</p>
          <p className="cifra mt-3 text-[32px] leading-none font-medium">{r.porReponer.length}</p>
          <p className="mt-3 text-[13px] text-muted-foreground">{UMBRAL_STOCK_BAJO} unidades o menos</p>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Gráfico principal */}
        <Panel className="flex flex-col p-5 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
            <div>
              <h2 className="text-[15px] font-medium">Valor por categoría</h2>
              <p className="mt-1 text-[13px] text-muted-foreground">Precio × stock, agrupado por categoría</p>
            </div>
            {r.mayor && r.mayor.valor > 0 && (
              <p className="text-[13px] text-texto-secundario">
                <span className="font-medium text-marca-tinta">{r.mayor.categoria}</span> concentra el{" "}
                <span className="cifra">{r.cuotaMayor}%</span>
              </p>
            )}
          </div>
          <ChartContainer config={configGrafico} className="mt-6 min-h-72 w-full flex-1">
            <BarChart data={r.porCategoria} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="categoria"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={48}
                tickFormatter={ejeDolares}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12, fontFamily: "var(--font-geist-mono)" }}
              />
              <ChartTooltip
                cursor={{ fill: "var(--muted)" }}
                content={
                  <ChartTooltipContent
                    hideIndicator
                    formatter={(valor) => <span className="cifra font-medium">{formatoMoneda(Number(valor))}</span>}
                  />
                }
              />
              <Bar dataKey="valor" radius={[6, 6, 0, 0]} maxBarSize={64}>
                {r.porCategoria.map((d) => (
                  <Cell key={d.categoria} fill={d.categoria === r.mayor?.categoria ? "var(--marca)" : "var(--chart-2)"} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </Panel>

        {/* Lista de reposición */}
        <Panel className="flex flex-col p-5">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-[15px] font-medium">Por reponer</h2>
            <span className="font-mono text-xs text-muted-foreground cifra">{r.porReponer.length}</span>
          </div>
          <p className="mt-1 text-[13px] text-muted-foreground">De menos a más unidades</p>
          {r.porReponer.length === 0 ? (
            <p className="mt-6 text-sm text-texto-secundario">Todo el catálogo está por encima de {UMBRAL_STOCK_BAJO} unidades</p>
          ) : (
            <ul className="mt-4 -mx-2 flex-1">
              {r.porReponer.map((p) => (
                <li key={p.id} className="flex h-14 items-center gap-3 rounded-lg px-2 [&+li]:border-t [&+li]:border-border">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{p.nombre}</p>
                    <EtiquetaSku sku={p.sku} className="mt-1" />
                  </div>
                  <Stock unidades={p.stock} />
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/productos"
            className="mt-4 self-start rounded-md text-[13px] text-texto-secundario underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring/60 outline-none"
          >
            Editar stock en Productos
          </Link>
        </Panel>
      </div>

      <Panel className="p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-[15px] font-medium">Productos</h2>
          <span className="font-mono text-xs text-muted-foreground cifra">{r.totalProductos}</span>
        </div>
        <div className="mt-4">
          <TablaProductos productos={productos} />
        </div>
      </Panel>
    </div>
  )
}
