import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button/button.tsx";
import {Edit, Plus, Trash2} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table/table.tsx";
import {currencyFormat, Product, ProductCategory} from "@/types/models/product.ts";
import {Badge} from "@/components/ui/badge/badge.tsx";
import {useEffect} from "react";

export type InventoryProps = {
  currentPage: number;
  itemsPerPage: number;
  categories: ProductCategory[];
  products: Product[];
  handlePageChange: (page: number) => void;
  handleEliminarProducto: (id: string) => void;
  abrirDialogoNuevoProducto: () => void;
  abrirDialogoEditarProducto: (producto: Product) => void;
}

const Inventory = ({ currentPage, itemsPerPage, categories, products, handlePageChange, handleEliminarProducto, abrirDialogoNuevoProducto, abrirDialogoEditarProducto }: InventoryProps) => {

  const totalPages = Math.ceil(products.length / itemsPerPage)

  useEffect(() => {
    if(currentPage > totalPages) {
      handlePageChange(totalPages)
    }
  }, [currentPage, handlePageChange, products, totalPages]);

  return <Card>
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
          {products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((producto) => <TableRow key={producto.id}>
            <TableCell className="font-medium text-left">{producto.name}</TableCell>
            <TableCell>{categories.find(c => c.id === producto.categoryId)?.name || 'Sin Categoría'}</TableCell>
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
          </TableRow>)}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button variant="ghost" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Anterior
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button variant="ghost" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Siguiente
        </Button>
      </div>
    </CardContent>
  </Card>
}

export default Inventory