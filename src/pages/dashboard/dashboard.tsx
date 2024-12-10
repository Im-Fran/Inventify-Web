import { useState, useEffect, useRef } from 'react'
import { Home, Package, Search, Settings, User as UserIcon, Plus, Edit, Trash2, X, Camera } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/forms/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table"
import { Badge } from "@/components/ui/badge/badge"
import { Button } from "@/components/ui/button/button.tsx"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/forms/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/forms/select"
import {currencyFormat, Product, products} from "@/types/models/product"
import { useLocalStorage } from '@uidotdev/usehooks'
import { User } from '@/types/models/user'
import { SearchTag } from '@/types/models/search_tag'
import Quagga from '@ericblade/quagga2';

const DashboardInventario = () => {
  const [login] = useLocalStorage<User | null>('login', null);
  const [productos, setProductos] = useLocalStorage<Product[]>('products', products)
  const [dialogoAbierto, setDialogoAbierto] = useState(false)
  const [productoEditando, setProductoEditando] = useState<Product | null>(null)
  const [nuevoProducto, setNuevoProducto] = useState<Product>({
    name: '',
    id: '',
    stock: 0,
    minStock: 0,
    price: 0,
    category: '',
    description: '',
    image: '',
    createdAt: new Date(),
    updatedAt: new Date()
  })
  const [busqueda, setBusqueda] = useState<SearchTag[]>([])
  const [productosFiltrados, setProductosFiltrados] = useState(productos)
  const [tagDialogOpen, setTagDialogOpen] = useState(false)
  const [newTagKind, setNewTagKind] = useState('nombre')
  const [newTagValue, setNewTagValue] = useState('')
  const [qrReaderOpen, setQrReaderOpen] = useState(false)
  const scannerRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedProducts = productosFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filter = () => {
    let resultados = [...productos]

    if (busqueda.length === 0) {
      setProductosFiltrados(resultados)
      return
    }

    busqueda.forEach(tag => {
      switch (tag.key.toLowerCase()) {
        case 'nombre':
          resultados = resultados.filter(p => p.name.toLowerCase().includes(tag.value.toLowerCase()))
          break
        case 'precio':
          resultados = resultados.filter(p => p.price.toString().includes(tag.value))
          break
        case 'stock':
          resultados = resultados.filter(p => p.stock.toString().includes(tag.value))
          break
        case 'categoria':
          resultados = resultados.filter(p => p.category.toLowerCase().includes(tag.value.toLowerCase()))
          break
        default:
          break
      }
    })

    setProductosFiltrados(resultados)
  }

  const abrirDialogoNuevoProducto = () => {
    setProductoEditando(null)
    setNuevoProducto({ name: '', id: '', stock: 0, minStock: 0, price: 0, category: '', description: '', image: '', createdAt: new Date(), updatedAt: new Date() })
    setDialogoAbierto(true)
  }

  const abrirDialogoEditarProducto = (producto: Product) => {
    setProductoEditando(producto)
    setNuevoProducto({ ...producto })
    setDialogoAbierto(true)
  }

  const handleGuardarProducto = () => {
    if (productoEditando) {
      setProductos(productos.map(p => p.id === productoEditando.id ? nuevoProducto : p))
    } else {
      setProductos([...productos, { ...nuevoProducto }])
    }
    setDialogoAbierto(false)
    filter();
  }

  const handleEliminarProducto = (id: string) => {
    setProductos(productos.filter(p => p.id !== id))
    filter();
  }

  const handleAddTag = () => {
    // setBusqueda(prev => [...prev, {key: newTagKind, value: newTagValue}])
    setTagDialogOpen(false)
    setNewTagKind('nombre')
    setNewTagValue('')
    filter();
  }

  // const handleRemoveTag = (tagToRemove: SearchTag) => {
  //   // setBusqueda(prev => prev.filter(tag => tag !== tagToRemove))
  //   filter();
  // }
  //
  // const handleScan = (data: string | null) => {
  //   if (data) {
  //     setNuevoProducto({ ...nuevoProducto, id: data });
  //     setQrReaderOpen(false);
  //   }
  // };
  //
  // const handleError = (err: any) => {
  //   console.error(err);
  // };

  const initScanner = async () => {
    // Implement quagga scanner
    setQrReaderOpen(true);
  }

  useEffect(() => {
    filter()
  }, [busqueda])

  return (
    <div className="flex h-screen bg-background">
      {/* Barra lateral */}
      <aside className="w-64 bg-card text-card-foreground">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-pink-500">RubyBox</h1>
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
            <UserIcon className="w-5 h-5 mr-3" />
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
          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-semibold text-foreground">Inventario</h2>
            <div className="relative mr-4 flex items-center w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              {/* 
              <div className="pl-10 w-full min-h-12 flex flex-wrap items-center gap-2 overflow-x-auto border rounded-md p-2">
                {busqueda.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center">
                    {tag.key}: {tag.value}
                    <X className="h-4 w-4 ml-2 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                  </Badge>
                ))}
              </div>
              
              <Button variant="ghost" className="ml-2" onClick={() => setTagDialogOpen(true)}>
                <Plus className="h-4 w-4" />
              </Button>
              */}
                <Input
                  placeholder="Buscar productos..."
                  className="w-full pl-10"
                  onChange={(e) => setBusqueda([{ key: 'nombre', value: e.target.value }])}
                  value={busqueda.find(tag => tag.key === 'nombre')?.value || ''}
                />
            </div>
            <button className="flex items-center ml-4 text-sm font-medium text-foreground hover:text-accent">
              <img
                className="w-8 h-8 rounded-full mr-2"
                src={login?.avatar}
                alt="Avatar del usuario"
              />
              {login?.name}
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
                <div className="text-2xl font-bold">{productos.filter(p => p.stock < p.minStock).length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Unidades</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productos.reduce((sum, p) => sum + p.stock, 0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor del Inventario</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currencyFormat.format(productos.reduce((sum, p) => sum + p.price * p.stock, 0))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de Inventario */}
          <Card>
            <CardHeader className="flex flex-row w-full justify-between items-center">
              <CardTitle>Inventario</CardTitle>
              <Button onClick={() => abrirDialogoNuevoProducto()}>
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
                  {paginatedProducts.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell className="font-medium text-left">{producto.name}</TableCell>
                      <TableCell>{producto.category}</TableCell>
                      <TableCell>{producto.stock}</TableCell>
                      <TableCell>{producto.minStock}</TableCell>
                      <TableCell>{currencyFormat.format(producto.price)}</TableCell>
                      <TableCell>
                        <Badge variant={producto.stock < producto.minStock ? "destructive" : "success"}>
                          {producto.stock < producto.minStock ? (producto.stock == 0 ? "Sin" : "Bajo") : "En"} Stock
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
              <div className="flex justify-between items-center mt-4">
                <Button
                  variant="ghost"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Anterior
                </Button>
                <span>
                  Página {currentPage} de {Math.ceil(productosFiltrados.length / itemsPerPage)}
                </span>
                <Button
                  variant="ghost"
                  disabled={currentPage === Math.ceil(productosFiltrados.length / itemsPerPage)}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Siguiente
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Diálogo para añadir/editar producto */}
      <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
        <DialogContent className="bg-neutral-800">
          <DialogHeader>
            <DialogTitle className="text-neutral-50">{productoEditando ? 'Editar Producto' : 'Añadir Nuevo Producto'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="barcode" className="text-right">
                Código de Barras
              </Label>
              <div className="col-span-3 flex items-center gap-2.5">
                <Input
                  id="barcode"
                  value={nuevoProducto.id}
                  onChange={(e) => setNuevoProducto({...nuevoProducto, id: e.target.value})}
                  className="flex-1"
                />
                <Button variant="ghost" size="sm" onClick={() => initScanner()}>
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={nuevoProducto.name}
                onChange={(e) => setNuevoProducto({...nuevoProducto, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoría
              </Label>
              <Select value={nuevoProducto.category} onValueChange={(value) => setNuevoProducto({...nuevoProducto, category: value})}>
                <SelectTrigger className="col-span-3 text-neutral-50">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {[...new Set(productos.map(it => it.category))].map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Cantidad
              </Label>
              <Input
                id="stock"
                type="number"
                value={nuevoProducto.stock}
                onChange={(e) => setNuevoProducto({...nuevoProducto, stock: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minStock" className="text-right">
                Stock Mínimo
              </Label>
              <Input
                id="minStock"
                type="number"
                value={nuevoProducto.minStock}
                onChange={(e) => setNuevoProducto({...nuevoProducto, minStock: parseInt(e.target.value)})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Precio
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={nuevoProducto.price}
                onChange={(e) => setNuevoProducto({...nuevoProducto, price: parseFloat(e.target.value)})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="gap-6">
            <Button onClick={() => setDialogoAbierto(false)}>Cancelar</Button>
            <Button onClick={() => handleGuardarProducto()}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR Reader Dialog */}
      <Dialog open={qrReaderOpen} onOpenChange={setQrReaderOpen}>
        <DialogContent className="bg-neutral-800">
          <DialogHeader>
            <DialogTitle className="text-neutral-50">Escanear Código QR</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* QR Reader Component */}
            {/* Replace with actual QR reader component */}
            <div ref={scannerRef} className="flex justify-center items-center h-64 bg-gray-700">
            </div>
          </div>
          <DialogFooter className="gap-6">
            <Button onClick={() => setQrReaderOpen(false)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para añadir etiqueta */}
      <Dialog open={tagDialogOpen} onOpenChange={setTagDialogOpen}>
        <DialogContent className="bg-neutral-800">
          <DialogHeader>
            <DialogTitle className="text-neutral-50">Añadir Etiqueta</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tagKind" className="text-right">
                Tipo
              </Label>
              <Select value={newTagKind} onValueChange={setNewTagKind}>
                <SelectTrigger className="col-span-3 text-neutral-50">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nombre">Nombre</SelectItem>
                  <SelectItem value="precio">Precio</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                  <SelectItem value="categoria">Categoría</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tagValue" className="text-right">
                Valor
              </Label>
              <Input
                id="tagValue"
                value={newTagValue}
                onChange={(e) => setNewTagValue(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="gap-6">
            <Button onClick={() => setTagDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => handleAddTag()}>Añadir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DashboardInventario