import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/forms/label.tsx";
import {Input} from "@/components/ui/forms/input.tsx";
import {Button} from "@/components/ui/button/button.tsx";
import {useEffect, useState} from "react";

export type NewCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCategory: (category: string) => void;
}

const NewCategoryDialog = ({ open, onOpenChange, onAddCategory}: NewCategoryDialogProps) => {

  const [newCategory, setNewCategory] = useState<string>('');

  useEffect(() => setNewCategory(prev => open ? '' : prev), [open]);

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-neutral-800">
      <DialogHeader>
        <DialogTitle className="text-neutral-50">Añadir Nueva Categoría</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="newCategory" className="text-right">
            Nombre
          </Label>
          <Input
            id="newCategory"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter className="gap-6">
        <Button onClick={() => onOpenChange(false)}>Cancelar</Button>
        <Button onClick={() => onAddCategory(newCategory)}>Añadir</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}

export default NewCategoryDialog;