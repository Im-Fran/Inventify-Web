import {defaultProducts, Product} from "@/types/models/product.ts";
import {faker, fakerES} from "@faker-js/faker";

export type Cart = {
  product: Product;
  quantity: number;
}[]

export type CartWithId = {
  id: string;
  cart: Cart;
}

export const defaultCarts: CartWithId[] = fakerES.helpers.multiple(() => ({
  // id is a timestamp
  id: fakerES.date.past({ years: 1 }).getTime().toString(),
  cart: fakerES.helpers.multiple(() => ({
    product: defaultProducts[faker.number.int({min: 0, max: defaultProducts.length - 1})],
    quantity: faker.number.int({min: 1, max: 10})
  }), { count: 5 }),
}), { count: 100 })