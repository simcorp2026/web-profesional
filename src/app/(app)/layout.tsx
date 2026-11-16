import { Sidebar } from "@/components/sidebar"
import { ProductosProvider } from "@/lib/productos-context"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProductosProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-[1440px]">{children}</div>
        </main>
      </div>
    </ProductosProvider>
  )
}
