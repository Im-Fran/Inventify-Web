import {useState, useEffect, useRef} from 'react'
import {Product, defaultCategories, ProductCategory, defaultProducts} from "@/types/models/product.ts"
import { useLocalStorage } from '@uidotdev/usehooks'
import Header from "@/pages/dashboard/components/header.tsx";
import Cards from "@/pages/dashboard/dashboard/components/cards.tsx";
import Inventory from "@/pages/dashboard/dashboard/components/inventory.tsx";
import AddProductDialog from "@/pages/dashboard/dashboard/components/dialogs/add-product-dialog.tsx";
import EditProductDialog, {EditProductDialogRef} from "@/pages/dashboard/dashboard/components/dialogs/edit-product-dialog.tsx";
import {useSearchParams} from "react-router-dom";
import SideNav from "@/pages/dashboard/components/sidenav.tsx";

const itemsPerPage = 10;

const DashboardInventario = () => {
  const [categories] = useLocalStorage<ProductCategory[]>('categories', defaultCategories)
  const [products, setProducts] = useLocalStorage<Product[]>('products', defaultProducts)

  const [isAddProductDialogOpen, setAddProductDialogOpen] = useState(false)
  const editProductDialogRef = useRef<EditProductDialogRef>(null)

  const [params] = useSearchParams()
  const [query, setQuery] = useState<string>('')
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')
  const [sortBy, setSortBy] = useState<'nombre' | 'precio' | 'stock' | 'categoría'>('nombre')

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setSort(params.get('sort') as 'asc' | 'desc' || 'asc')
    setSortBy(params.get('sortBy') as 'nombre' | 'precio' | 'stock' | 'categoría' || 'nombre')
  }, [params]);

  return <div className="flex flex-col h-screen bg-background">
    {/* Encabezado */}
    <Header query={query} setQuery={(query) => {
      setCurrentPage(1)
      setQuery(query || '')
    }}/>
    {/* Contenido principal */}
    <div className="flex-1 flex overflow-hidden">
      <SideNav/>
      {/* Área de contenido principal */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
        <Cards products={products} />

        {/* Tabla de Inventario */}
        {categories && <Inventory
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            categories={categories}
            handlePageChange={setCurrentPage}
            handleEliminarProducto={(id) => setProducts(products.filter(it => it.id !== id))}
            abrirDialogoNuevoProducto={() => setAddProductDialogOpen(true)}
            abrirDialogoEditarProducto={(it) => editProductDialogRef.current?.open(it)}


            products={products.filter(it => it.name.toLowerCase().includes(query || '') || query == null).sort((a, b) => {
              switch (sortBy) {
                case 'nombre':
                  return a.name.localeCompare(b.name) * (sort === 'asc' ? 1 : -1);
                case 'precio':
                  return (a.price - b.price) * (sort === 'asc' ? 1 : -1);
                case 'stock':
                  return (a.stock - b.stock) * (sort === 'asc' ? 1 : -1);
                case 'categoría':
                  return a.categoryId.localeCompare(b.categoryId) * (sort === 'asc' ? 1 : -1);
                default:
                  return 0;
              }
            })}
        />}
      </main>
    </div>

    {/* Diálogo para añadir/editar producto */}
    {categories && <AddProductDialog
        categories={categories}
        open={isAddProductDialogOpen}
        onOpenChange={setAddProductDialogOpen}
        onSaveProduct={(product) => setProducts([...products.filter(it => it.id !== product.id), product])}
    />}

    {categories && <EditProductDialog
        ref={editProductDialogRef}
        categories={categories}
        onSaveProduct={(product) => setProducts([...products.filter(it => it.id !== product.id), product])}
    />}
  </div>
}

export default DashboardInventario