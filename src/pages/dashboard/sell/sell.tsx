import { useState, useRef } from 'react';
import {currencyFormat, Product} from "@/types/models/product";
import { useLocalStorage } from '@uidotdev/usehooks';
import Header from "@/pages/dashboard/components/header.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table.tsx";
import { Button } from "@/components/ui/button/button.tsx";
import { Input } from "@/components/ui/forms/input.tsx";
import {Plus, Minus, Trash2, Search} from "lucide-react";
import { toast } from "react-hot-toast";
import SearchProductDialog, {SearchProductDialogRef} from "@/pages/dashboard/sell/components/dialogs/search-product-dialog.tsx";
import SideNav from "@/pages/dashboard/components/sidenav.tsx";
import Cards from "@/pages/dashboard/sell/components/cards.tsx";
import {Cart, IndexedCart} from "@/types/models/cart.ts";

const Sell = () => {
  const [, setSoldCarts] = useLocalStorage<IndexedCart[]>('sold_carts', []);
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);
  const [cart, setCart] = useState<Cart>([]);
  const [barcode, setBarcode] = useState('');
  const searchProductDialogRef = useRef<SearchProductDialogRef>(null)

  const handleAddToCart = (barcode: string) => {
    const product = products.find(p => p.id === barcode);
    if (product) {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.product.id === barcode);
        if (existingItem) {
          return prevCart.map(item =>
            item.product.id === barcode ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { product, quantity: 1 }];
        }
      });
    } else {
      toast.error('Este producto no existe en el inventario!');
    }
    setBarcode('');
  };

  const handleRemoveFromCart = (barcode: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== barcode));
  };

  const handleIncreaseQuantity = (barcode: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === barcode ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (barcode: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === barcode && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleFinishSale = () => {
    if(cart.length === 0) {
      toast.error('No hay productos en la venta!');
      return;
    }

    setProducts(prevProducts =>
      prevProducts.map(product => {
        const cartItem = cart.find(item => item.product.id === product.id);
        if (cartItem) {
          return { ...product, stock: product.stock - cartItem.quantity };
        }
        return product;
      })
    );

    setSoldCarts(prev => [...prev, { id: Date.now().toString(), cart }]);
    setCart([]);
    toast.success('Venta finalizada con éxito!');
  };

  const handleCancelSale = () => {
    if(cart.length === 0) {
      toast.error('No hay productos en la venta!');
      return;
    }

    setCart([]);
    toast.error('Venta cancelada.');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header/>
      <div className="flex-1 flex overflow-hidden">
        <SideNav/>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <Cards cart={cart}/>
          <div className="flex items-center justify-center w-full mb-6 gap-2.5">
            <Input
              // ref={barcodeInputRef}
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddToCart(barcode)}
              placeholder="Escanea el código de barras"
              className="w-full"
            />
            <Button onClick={() => searchProductDialogRef.current?.open()}>
              <Search/>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map(item => (
                <TableRow key={item.product.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{currencyFormat.format(item.product.price)}</TableCell>
                  <TableCell>{currencyFormat.format(item.product.price * item.quantity)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleIncreaseQuantity(item.product.id)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDecreaseQuantity(item.product.id)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveFromCart(item.product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-6">
            <Button variant="danger" onClick={handleCancelSale}>Cancelar Venta</Button>
            <Button onClick={handleFinishSale}>Finalizar Venta</Button>
          </div>
        </main>
      </div>

      <SearchProductDialog ref={searchProductDialogRef} onProductChosen={(product) => handleAddToCart(product.id)}/>
    </div>
  );
};

export default Sell;