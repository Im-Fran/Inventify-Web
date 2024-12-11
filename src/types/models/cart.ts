import {Product} from "@/types/models/product.ts";

export type Cart = {
  product: Product;
  quantity: number;
}[]