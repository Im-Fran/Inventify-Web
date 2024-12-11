import { useState, forwardRef, useImperativeHandle } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/forms/input.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Product } from "@/types/models/product";
import { Button } from "@/components/ui/button/button.tsx";
import { useLocalStorage } from "@uidotdev/usehooks";

export type SearchProductDialogRef = {
  open: () => void;
  close: () => void;
}

type SearchProductDialogProps = {
  onProductChosen: (product: Product) => void;
};

export const SearchProductDialog = forwardRef<SearchProductDialogRef, SearchProductDialogProps>(({ onProductChosen }: SearchProductDialogProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts] = useLocalStorage<Product[]>('products');

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  const handleProductClick = (product: Product) => {
    onProductChosen(product);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-neutral-50">Select a Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a product"
            className="w-full mb-4"
          />
          <div className="grid grid-cols-3 gap-6 overflow-y-auto h-96">
            {allProducts.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
              <Card key={product.id} className="mb-4 cursor-pointer h-40" onClick={() => handleProductClick(product)}>
                <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded-t-lg"/>
                <h3 className="text-md font-semibold mt-2 px-2">{product.name}</h3>
              </Card>
            ))}
          </div>
        </div>
        <DialogFooter className="gap-6">
          <Button variant={"danger"} onClick={() => setIsOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default SearchProductDialog;