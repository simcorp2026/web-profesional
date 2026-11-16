import { UMBRAL_STOCK_BAJO } from "@/data/productos"
import { cn } from "@/lib/utils"

// Stock como cifra; un punto marca lo que hay que reponer, sin pastillas.
export function Stock({ unidades, className }: { unidades: number; className?: string }) {
  const agotado = unidades === 0
  const bajo = unidades <= UMBRAL_STOCK_BAJO

  return (
    <span className={cn("inline-flex items-center justify-end gap-2 font-mono text-[13px] cifra", className)}>
      {bajo && (
        <span
          aria-hidden
          className={cn("size-1.5 rounded-full", agotado ? "bg-destructive" : "bg-marca")}
        />
      )}
      <span className={cn(agotado ? "text-destructive" : bajo ? "text-marca-tinta" : "text-foreground")}>
        {agotado ? "Agotado" : unidades}
      </span>
      {bajo && !agotado && <span className="sr-only">stock bajo</span>}
    </span>
  )
}
