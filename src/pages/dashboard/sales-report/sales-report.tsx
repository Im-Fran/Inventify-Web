import { useLocalStorage } from '@uidotdev/usehooks';
import { IndexedCart } from '@/types/models/cart.ts';
import Header from '@/pages/dashboard/components/header.tsx';
import SideNav from '@/pages/dashboard/components/sidenav.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table/table.tsx';
import { currencyFormat } from '@/types/models/product.ts';

const SalesReport = () => {
  const [soldCarts] = useLocalStorage<IndexedCart[]>('sold_carts', []);
  
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <SideNav />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <Card>
            <CardHeader className="flex flex-row w-full justify-between items-center">
              <CardTitle>Reporte de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID de Venta</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Total Ganado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {soldCarts.map((sale) => {
                    const totalEarned = sale.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
                    return (
                      <TableRow key={sale.id}>
                        <TableCell>{sale.id}</TableCell>
                        <TableCell>{new Date(parseInt(sale.id)).toLocaleString()}</TableCell>
                        <TableCell>{currencyFormat.format(totalEarned)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default SalesReport;