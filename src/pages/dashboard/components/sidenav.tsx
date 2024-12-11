import {DollarSign, Package, ShoppingCart, Tag} from "lucide-react";
import { Link } from "react-router-dom";

const SideNav = () =>
  <nav className="flex flex-col bg-background h-full p-6">
    <Link to={"/dashboard/categories"} className="flex items-center mb-4 text-foreground hover:text-accent">
      <Tag className="mr-2"/>
      Categorías
    </Link>
    <Link to="/dashboard/inventory" className="flex items-center mb-4 text-foreground hover:text-accent">
      <Package className="mr-2"/>
      Inventario
    </Link>
    <Link to="/dashboard/sell" className="flex items-center mb-4 text-foreground hover:text-accent">
      <ShoppingCart className="mr-2"/>
      Venta
    </Link>
    <Link to={"/dashboard/sales-report"} className="flex items-center mb-4 text-foreground hover:text-accent">
      <DollarSign className="mr-2"/>
      Reporte de Ventas
    </Link>
  </nav>;

export default SideNav;