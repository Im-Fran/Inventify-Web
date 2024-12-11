import { useState, useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import { CartWithId, defaultCarts } from '@/types/models/cart.ts';
import Header from '@/pages/dashboard/components/header.tsx';
import SideNav from '@/pages/dashboard/components/sidenav.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table/table.tsx';
import { Button } from '@/components/ui/button/button.tsx';
import { currencyFormat } from '@/types/models/product.ts';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const itemsPerPage = 10;

const SalesReport = () => {
  const [soldCarts] = useLocalStorage<CartWithId[]>('sold_carts', defaultCarts);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(soldCarts.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const salesByMonth = soldCarts.reduce((acc, sale) => {
    const date = new Date(parseInt(sale.id));
    let month = date.toLocaleString('es-CL', { month: 'long', year: 'numeric' });
    month = month.charAt(0).toUpperCase() + month.slice(1);
    const totalEarned = sale.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += totalEarned;

    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(salesByMonth),
    datasets: [
      {
        label: 'Ventas Totales',
        data: Object.values(salesByMonth),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

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
              <div className="mb-6">
                <Line data={chartData} options={{
                  responsive: true,
                  plugins: {legend: {position: 'top'}, title: {display: true, text: 'Ventas Totales Mensuales'}}
                }}/>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID de Venta</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Total Ganado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {soldCarts.sort((a, b) => {
                    const dateA = new Date(parseInt(a.id));
                    const dateB = new Date(parseInt(b.id));
                    return dateB.getTime() - dateA.getTime();
                  }).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((sale) => {
                    const totalEarned = sale.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
                    return (
                      <TableRow key={sale.id}>
                        <TableCell>{sale.id}</TableCell>
                        <TableCell>{new Date(parseInt(sale.id)).toLocaleString('es-CL')}</TableCell>
                        <TableCell>{currencyFormat.format(totalEarned)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="flex justify-between items-center mt-4">
                <Button variant="ghost" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                  Anterior
                </Button>
                <span>Página {currentPage} de {totalPages}</span>
                <Button variant="ghost" disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}>
                  Siguiente
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default SalesReport;