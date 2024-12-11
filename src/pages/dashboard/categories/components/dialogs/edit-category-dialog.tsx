import { forwardRef, useImperativeHandle, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx';
import { Label } from '@/components/ui/forms/label.tsx';
import { Input } from '@/components/ui/forms/input.tsx';
import { Button } from '@/components/ui/button/button.tsx';
import { ProductCategory } from '@/types/models/product.ts';

export type EditCategoryDialogProps = {
  onSaveCategory: (category: ProductCategory) => void;
};

export type EditCategoryDialogRef = {
  open: (category: ProductCategory) => void;
};

const EditCategoryDialog = forwardRef<EditCategoryDialogRef, EditCategoryDialogProps>(({ onSaveCategory }, ref) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<ProductCategory | null>(null);

  useImperativeHandle(ref, () => ({
    open: (category: ProductCategory) => {
      setCategory(category);
      setOpen(true);
    }
  }));

  const handleSaveCategory = () => {
    if (category) {
      onSaveCategory(category);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-neutral-50">Editar Categoría</DialogTitle>
        </DialogHeader>
        {category && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nombre</Label>
              <Input
                id="name"
                value={category.name}
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
                className="col-span-3"
                onKeyDown={(e) => e.key === 'Enter' && handleSaveCategory()}
              />
            </div>
          </div>
        )}
        <DialogFooter className="gap-6">
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveCategory}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default EditCategoryDialog;