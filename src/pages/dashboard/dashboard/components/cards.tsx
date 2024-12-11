import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Package} from "lucide-react";
import {currencyFormat, Product} from "@/types/models/product.ts";

export type CardsProps = {
  products: Product[];
}

const Cards = ({ products }: CardsProps) => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total de Productos</CardTitle>
      <Package className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{products.length}</div>
    </CardContent>
  </Card>
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Productos con Bajo Stock</CardTitle>
      <Package className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{products.filter(p => p.stock < p.minStock).length}</div>
    </CardContent>
  </Card>
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total de Unidades</CardTitle>
      <Package className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.stock, 0)}</div>
    </CardContent>
  </Card>
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Valor del Inventario</CardTitle>
      <Package className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {currencyFormat.format(products.reduce((sum, p) => sum + p.price * p.stock, 0))}
      </div>
    </CardContent>
  </Card>
</div>

export default Cards