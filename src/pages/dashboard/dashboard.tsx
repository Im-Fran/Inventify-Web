import { useState, useEffect } from 'react'
import { Bell, Home, Package, Search, Settings, User, Plus, Edit, Trash2, ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/forms/input.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table"
import { Badge } from "@/components/ui/badge/badge.tsx"
import { Button } from "@/components/ui/button/button.tsx"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/forms/label.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/forms/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Datos simulados de productos
const productosIniciales = [
  { id: 1, nombre: 'Collar de Rubí', cantidad: 15, stockMinimo: 5, precio: 299.99, categoria: 'Joyería' },
  { id: 2, nombre: 'Pendientes de Rubí', cantidad: 20, stockMinimo: 8, precio: 199.99, categoria: 'Joyería' },
  { id: 3, nombre: 'Anillo de Rubí', cantidad: 10, stockMinimo: 3, precio: 249.99, categoria: 'Joyería' },
  { id: 4, nombre: 'Pulsera de Rubí', cantidad: 5, stockMinimo: 2, precio: 179.99, categoria: 'Joyería' },
  { id: 5, nombre: 'Colgante de Rubí', cantidad: 8, stockMinimo: 4, precio: 149.99, categoria: 'Joyería' },
  { id: 6, nombre: 'Gema de Rubí', cantidad: 30, stockMinimo: 10, precio: 99.99, categoria: 'Piedras Preciosas' },
  { id: 7, nombre: 'Rubí en Bruto', cantidad: 25, stockMinimo: 5, precio: 79.99, categoria: 'Piedras Preciosas' },
  { id: 8, nombre: 'Caja de Joyería', cantidad: 40, stockMinimo: 15, precio: 39.99, categoria: 'Accesorios' },
]

const categorias = ['Joyería', 'Piedras Preciosas', 'Accesorios']

export default function DashboardInventario() {
  const [productos, setProductos] = useState(productosIniciales)
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [productoEditando, setProductoEditando] = useState(null)
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', id: 0, cantidad: 0, stockMinimo: 0, precio: 0, categoria: '' })
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('nombre')
  const [productosFiltrados, setProductosFiltrados] = useState(productos)

  useEffect(() => {
    filtrarProductos()
  }, [busqueda, filtro, productos])

  const filtrarProductos = () => {
    let resultados = [...productos]
    if (busqueda) {
      switch (filtro) {
        case 'nombre':
          resultados = resultados.filter(p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
          break
        case 'precio':
          resultados = resultados.filter(p => p.precio.toString().includes(busqueda))
          break
        case 'stock':
          resultados = resultados.sort((a, b) => {
            const stockA = a.cantidad / a.stockMinimo
            const stockB = b.cantidad / b.stockMinimo
            return stockB - stockA
          })
          break
        case 'categoria':
          resultados = resultados.filter(p => p.categoria.toLowerCase().includes(busqueda.toLowerCase()))
          break
      }
    }
    setProductosFiltrados(resultados)
  }

  const abrirDialogoNuevoProducto = () => {
    setProductoEditando(null)
    setNuevoProducto({ nombre: '', id: 0,cantidad: 0, stockMinimo: 0, precio: 0, categoria: '' })
    setDialogoAbierto(true)
  }

  const abrirDialogoEditarProducto = (producto) => {
    setProductoEditando(producto)
    setNuevoProducto({ ...producto })
    setDialogoAbierto(true)
  }

  const handleGuardarProducto = () => {
    if (productoEditando) {
      setProductos(productos.map(p => p.id === productoEditando.id ? nuevoProducto : p))
    } else {
      setProductos([...productos, { ...nuevoProducto, id: Date.now() }])
    }
    setDialogoAbierto(false)
  }

  const handleEliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id))
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Barra lateral */}
      <aside className="w-64 bg-card text-card-foreground">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Ruby Box</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="flex items-center px-6 py-3 text-foreground hover:bg-accent">
            <Home className="w-5 h-5 mr-3" />
            Inicio
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-foreground bg-accent">
            <Package className="w-5 h-5 mr-3" />
            Inventario
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-foreground hover:bg-accent">
            <User className="w-5 h-5 mr-3" />
            Clientes
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-foreground hover:bg-accent">
            <Settings className="w-5 h-5 mr-3" />
            Configuración
          </a>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Encabezado */}
        <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
          <h2 className="text-2xl font-semibold text-foreground">Inventario</h2>
          <div className="flex items-center">
            <div className="relative mr-4 flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                className="pl-10 w-64"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-2">
                    Filtrar por <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFiltro('nombre')}>Nombre</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFiltro('precio')}>Precio</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFiltro('stock')}>Stock</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFiltro('categoria')}>Categoría</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <button className="p-2 text-foreground hover:bg-accent rounded-full">
              <Bell className="w-6 h-6" />
            </button>
            <button className="flex items-center ml-4 text-sm font-medium text-foreground hover:text-accent">
              <img
                className="w-8 h-8 rounded-full mr-2"
                src="/placeholder.svg?height=32&width=32"
                alt="Avatar del usuario"
              />
              Juan Pérez
            </button>
          </div>
        </header>

        {/* Área de contenido principal */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Productos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productos.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Productos con Bajo Stock</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productos.filter(p => p.cantidad < p.stockMinimo).length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Unidades</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productos.reduce((sum, p) => sum + p.cantidad, 0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor del Inventario</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${productos.reduce((sum, p) => sum + p.precio * p.cantidad, 0).toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de Inventario */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Inventario</CardTitle>
              <Button onClick={abrirDialogoNuevoProducto}>
                <Plus className="mr-2 h-4 w-4" /> Añadir Producto
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre del Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Stock Mínimo</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productosFiltrados.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell className="font-medium">{producto.nombre}</TableCell>
                      <TableCell>{producto.categoria}</TableCell>
                      <TableCell>{producto.cantidad}</TableCell>
                      <TableCell>{producto.stockMinimo}</TableCell>
                      <TableCell>${producto.precio.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={producto.cantidad < producto.stockMinimo ? "destructive" : "success"}>
                          {producto.cantidad < producto.stockMinimo ? "Bajo Stock" : "En Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => abrirDialogoEditarProducto(producto)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEliminarProducto(producto.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Diálogo para añadir/editar producto */}
      <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{productoEditando ? 'Editar Producto' : 'Añadir Nuevo Producto'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                value={nuevoProducto.nombre}
                onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoria" className="text-right">
                Categoría
              </Label>
              <Select
                value={nuevoProducto.categoria}
                onValueChange={(value) => setNuevoProducto({...nuevoProducto, categoria: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cantidad" className="text-right">
                Cantidad
              </Label>
              <Input
                id="cantidad"
                type="number"
                value={nuevoProducto.cantidad}
                onChange={(e) => setNuevoProducto({...nuevoProducto, cantidad: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stockMinimo" className="text-right">
                Stock Mínimo
              </Label>
              <Input
                id="stockMinimo"
                type="number"
                value={nuevoProducto.stockMinimo}
                onChange={(e) => setNuevoProducto({...nuevoProducto, stockMinimo: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="precio" className="text-right">
                Precio
              </Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                value={nuevoProducto.precio}
                onChange={(e) => setNuevoProducto({...nuevoProducto, precio: parseFloat(e.target.value)})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setDialogoAbierto(false)}>Cancelar</Button>
            <Button onClick={handleGuardarProducto}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}