"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutDashboard, Package } from "lucide-react"
import { cn } from "@/lib/utils"

const enlaces = [
  { href: "/dashboard", texto: "Dashboard", icono: LayoutDashboard },
  { href: "/productos", texto: "Productos", icono: Package },
]

function EnlaceNav({ href, texto, icono: Icono, activo }: { href: string; texto: string; icono: typeof Home; activo: boolean }) {
  return (
    <Link
      href={href}
      aria-current={activo ? "page" : undefined}
      className={cn(
        "flex h-9 shrink-0 items-center gap-2.5 rounded-lg px-2.5 text-sm text-texto-secundario transition-colors duration-150 ease-salida outline-none hover:bg-foreground/4 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60",
        activo && "bg-card font-medium text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-foreground/8 hover:bg-card"
      )}
    >
      <Icono className="size-4 shrink-0" strokeWidth={1.5} />
      {texto}
    </Link>
  )
}

export function Sidebar() {
  const ruta = usePathname()

  return (
    <aside className="flex flex-col border-b border-border bg-sidebar md:sticky md:top-0 md:h-svh md:w-60 md:shrink-0 md:border-r md:border-b-0">
      <div className="flex h-14 items-center px-5 text-[15px] font-medium tracking-tight">GestionaProductosEc</div>
      <nav className="flex gap-0.5 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:pb-0">
        {enlaces.map((e) => (
          <EnlaceNav key={e.href} {...e} activo={ruta === e.href} />
        ))}
        <div className="md:mt-auto md:pb-4">
          <EnlaceNav href="/" texto="Portada" icono={Home} activo={false} />
        </div>
      </nav>
    </aside>
  )
}
