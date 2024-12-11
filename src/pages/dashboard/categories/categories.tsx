import { useState, useRef } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import {Product, ProductCategory} from '@/types/models/product.ts';
import Header from '@/pages/dashboard/components/header.tsx';
import SideNav from '@/pages/dashboard/components/sidenav.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button/button.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table/table.tsx';
import { Edit, Plus, Trash2 } from 'lucide-react';
import NewCategoryDialog from '@/pages/dashboard/categories/components/dialogs/new-category-dialog.tsx';
import EditCategoryDialog, { EditCategoryDialogRef } from '@/pages/dashboard/categories/components/dialogs/edit-category-dialog.tsx';
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const [categories, setCategories] = useLocalStorage<ProductCategory[]>('categories', []);
  const [products] = useLocalStorage<Product[]>('products', []);
  const [isNewCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false);
  const editCategoryDialogRef = useRef<EditCategoryDialogRef>(null);

  const handleAddCategory = (category: ProductCategory) => {
    setCategories([...categories, category]);
  };

  const handleEditCategory = (updatedCategory: ProductCategory) => {
    setCategories(categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));
  };

  const handleDeleteCategory = (id: string) => {
    if(products.filter(it => it.categoryId == id).length > 0) {
      toast.error('No puedes eliminar una categoría que tiene productos asociados!');
      return;
    }
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header/>
      <div className="flex-1 flex overflow-hidden">
        <SideNav />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <Card>
            <CardHeader className="flex flex-row w-full justify-between items-center">
              <CardTitle>Categorías</CardTitle>
              <Button onClick={() => setNewCategoryDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Añadir Categoría
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre de la Categoría</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map(category => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium text-left">{category.name}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => editCategoryDialogRef.current?.open(category)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
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

      <NewCategoryDialog
        open={isNewCategoryDialogOpen}
        onOpenChange={setNewCategoryDialogOpen}
        onAddCategory={handleAddCategory}
      />

      <EditCategoryDialog
        ref={editCategoryDialogRef}
        onSaveCategory={handleEditCategory}
      />
    </div>
  );
};

export default CategoriesPage;