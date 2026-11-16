import { cn } from "@/lib/utils"

// Firma visual: el SKU como etiqueta de estante.
export function EtiquetaSku({ sku, className }: { sku: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-[4px] border border-foreground/12 bg-card px-1.5 font-mono text-[11px] leading-none text-texto-secundario",
        className
      )}
    >
      {sku}
    </span>
  )
}
