import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Package} from "lucide-react";
import {currencyFormat} from "@/types/models/product.ts";
import {Cart} from "@/types/models/cart.ts";

export type CardsProps = {
  cart: Cart,
}

const Cards = ({ cart }: CardsProps) => {

  const totalProducts = cart.length;
  const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalSale = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total de Productos</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground"/>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalProducts}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total de Unidades</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground"/>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalUnits}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total de Esta Venta</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground"/>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{currencyFormat.format(totalSale)}</div>
      </CardContent>
    </Card>
  </div>;
}

export default Cards;