// Datos mock de la app. Se cargan al iniciar y los cambios viven en memoria.

export type Producto = {
  id: string
  nombre: string
  sku: string
  precio: number
  stock: number
  categoria: string
}

export const CATEGORIAS = [
  "Electrónica",
  "Hogar",
  "Oficina",
  "Deportes",
  "Alimentos",
] as const

// Un producto con stock igual o menor a este valor se considera "stock bajo".
export const UMBRAL_STOCK_BAJO = 10

export const productosIniciales: Producto[] = [
  { id: "1", nombre: "Audífonos inalámbricos Pulse", sku: "ELE-1001", precio: 59.9, stock: 42, categoria: "Electrónica" },
  { id: "2", nombre: "Teclado mecánico TKL", sku: "ELE-1002", precio: 89.0, stock: 8, categoria: "Electrónica" },
  { id: "3", nombre: "Monitor 27\" QHD", sku: "ELE-1003", precio: 279.0, stock: 15, categoria: "Electrónica" },
  { id: "4", nombre: "Cargador USB-C 65W", sku: "ELE-1004", precio: 34.5, stock: 3, categoria: "Electrónica" },
  { id: "5", nombre: "Lámpara de escritorio LED", sku: "HOG-2001", precio: 27.9, stock: 60, categoria: "Hogar" },
  { id: "6", nombre: "Juego de sartenes antiadherentes", sku: "HOG-2002", precio: 74.0, stock: 12, categoria: "Hogar" },
  { id: "7", nombre: "Organizador de cocina 3 niveles", sku: "HOG-2003", precio: 19.5, stock: 0, categoria: "Hogar" },
  { id: "8", nombre: "Silla ergonómica Flex", sku: "OFI-3001", precio: 189.0, stock: 9, categoria: "Oficina" },
  { id: "9", nombre: "Resma papel A4 (500 hojas)", sku: "OFI-3002", precio: 5.2, stock: 340, categoria: "Oficina" },
  { id: "10", nombre: "Cuaderno tapa dura A5", sku: "OFI-3003", precio: 7.8, stock: 120, categoria: "Oficina" },
  { id: "11", nombre: "Esterilla de yoga 6mm", sku: "DEP-4001", precio: 24.9, stock: 35, categoria: "Deportes" },
  { id: "12", nombre: "Mancuernas ajustables 20kg", sku: "DEP-4002", precio: 129.0, stock: 6, categoria: "Deportes" },
  { id: "13", nombre: "Botella térmica 750ml", sku: "DEP-4003", precio: 18.0, stock: 88, categoria: "Deportes" },
  { id: "14", nombre: "Café en grano 1kg", sku: "ALI-5001", precio: 16.5, stock: 54, categoria: "Alimentos" },
  { id: "15", nombre: "Aceite de oliva extra virgen 1L", sku: "ALI-5002", precio: 11.9, stock: 4, categoria: "Alimentos" },
  { id: "16", nombre: "Mix de frutos secos 500g", sku: "ALI-5003", precio: 9.4, stock: 73, categoria: "Alimentos" },
]

export const formatoMoneda = (valor: number) =>
  new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" }).format(valor)
