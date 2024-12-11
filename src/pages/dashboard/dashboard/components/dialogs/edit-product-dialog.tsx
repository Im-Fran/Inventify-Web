import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/forms/label.tsx";
import { Input } from "@/components/ui/forms/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/forms/select.tsx";
import { Button } from "@/components/ui/button/button.tsx";
import { Product, ProductCategory } from "@/types/models/product.ts";
import { forwardRef, useImperativeHandle, useState } from "react";

export type EditProductDialogProps = {
  categories: ProductCategory[];
  onSaveProduct: (product: Product) => void;
}

export type EditProductDialogRef = {
  open: (product: Product) => void;
}

const EditProductDialog = forwardRef<EditProductDialogRef, EditProductDialogProps>(({ categories, onSaveProduct }: EditProductDialogProps, ref) => {
  const [open, setOpen] = useState(false);
  const [producto, setProducto] = useState<Product | null>(null);

  useImperativeHandle(ref, () => ({
    open: (product: Product) => {
      setProducto(product);
      setOpen(true);
    }
  }));

  const handleGuardarProducto = () => {
    if (producto) {
      onSaveProduct(producto);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-neutral-50">Editar Producto</DialogTitle>
        </DialogHeader>
        {producto && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="barcode" className="text-right">Código de Barras</Label>
              <div className="col-span-3 flex items-center gap-2.5">
                <Input
                  id="barcode"
                  value={producto.id}
                  onChange={(e) => setProducto({ ...producto, id: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nombre</Label>
              <Input
                id="name"
                value={producto.name}
                onChange={(e) => setProducto({ ...producto, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Descripción (opcional)</Label>
              <Input
                id="description"
                value={producto.description}
                onChange={(e) => setProducto({ ...producto, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Imagen (opcional)</Label>
              <Input
                id="image"
                value={producto.image}
                onChange={(e) => setProducto({ ...producto, image: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Categoría</Label>
              <div className="col-span-3 flex items-center gap-2.5">
                <Select value={producto.categoryId} onValueChange={(value) => setProducto({ ...producto, categoryId: value })}>
                  <SelectTrigger className="text-neutral-50">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {categories.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Cantidad</Label>
              <Input
                id="stock"
                type="number"
                value={producto.stock}
                onChange={(e) => setProducto({ ...producto, stock: parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minStock" className="text-right">Stock Mínimo</Label>
              <Input
                id="minStock"
                type="number"
                value={producto.minStock}
                onChange={(e) => setProducto({ ...producto, minStock: parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Precio</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={producto.price}
                onChange={(e) => setProducto({ ...producto, price: parseFloat(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
        )}
        <DialogFooter className="gap-6">
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleGuardarProducto}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default EditProductDialog;