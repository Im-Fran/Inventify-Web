import {Package, ShoppingCart} from "lucide-react";
import { Link } from "react-router-dom";

const SideNav = () =>
  <nav className="flex flex-col bg-background h-full p-6">
    <Link to="/dashboard/inventory" className="flex items-center mb-4 text-foreground hover:text-accent">
      <Package className="mr-2"/>
      Inventario
    </Link>
    <Link to="/dashboard/sell" className="flex items-center mb-4 text-foreground hover:text-accent">
      <ShoppingCart className="mr-2"/>
      Venta
    </Link>
  </nav>;

export default SideNav;