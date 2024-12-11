import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/forms/label.tsx";
import { Input } from "@/components/ui/forms/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/forms/select.tsx";
import { Button } from "@/components/ui/button/button.tsx";
import { Plus } from "lucide-react";
import {Product, ProductCategory} from "@/types/models/product.ts";
import { useState } from "react";

export type AddProductDialogProps = {
  categories: ProductCategory[],
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveProduct: (product: Product) => void;
  setNewCategoryDialogOpen: (open: boolean) => void;
}

const AddProductDialog = ({ open, onOpenChange, onSaveProduct, setNewCategoryDialogOpen, categories }: AddProductDialogProps) => {
  const [nuevoProducto, setNuevoProducto] = useState<Product>({
    id: '',
    name: '',
    stock: 0,
    minStock: 0,
    price: 0,
    categoryId: '',
    description: '',
    image: '',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const handleGuardarProducto = () => {
    onSaveProduct(nuevoProducto);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-neutral-50">Añadir Nuevo Producto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="barcode" className="text-right">Código de Barras</Label>
            <div className="col-span-3 flex items-center gap-2.5">
              <Input
                id="barcode"
                value={nuevoProducto.id}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, id: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nombre</Label>
            <Input
              id="name"
              value={nuevoProducto.name}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Categoría</Label>
            <div className="col-span-3 flex items-center gap-2.5">
              <Select value={nuevoProducto.categoryId} onValueChange={(value) => setNuevoProducto({ ...nuevoProducto, categoryId: value })}>
                <SelectTrigger className="text-neutral-50">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {categories.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" onClick={() => setNewCategoryDialogOpen(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">Cantidad</Label>
            <Input
              id="stock"
              type="number"
              value={nuevoProducto.stock}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: parseInt(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minStock" className="text-right">Stock Mínimo</Label>
            <Input
              id="minStock"
              type="number"
              value={nuevoProducto.minStock}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, minStock: parseInt(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Precio</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={nuevoProducto.price}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, price: parseFloat(e.target.value) })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="gap-6">
          <Button onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleGuardarProducto}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;