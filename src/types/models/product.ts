import { faker } from '@faker-js/faker';

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  stock: number;
  minStock: number;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCategory = {
  id: string;
  name: string;
}

export const generateUuid = (): string => faker.string.uuid()

export const createFakeProductCategory = (): ProductCategory => ({
  id: faker.string.uuid(),
  name: faker.commerce.department(),
})

export const createFakeProduct = (categories: ProductCategory[]): Product => ({
  id: faker.commerce.isbn({
    separator: '',
  }),
  categoryId: categories[faker.number.int({
    min: 0,
    max: categories.length - 1,
  })].id,
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price({
    symbol: '$',
    min: 1000,
    max: 99999,
    dec: 0,
  }).replace('$', '')),
  stock: faker.number.int({
    min: 1,
    max: 100,
  }),
  minStock: 1,
  description: faker.lorem.paragraph(),
  image: faker.image.url(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
})

export const defaultCategories: ProductCategory[] = [{id: 'panaderia', name: 'Panadería'}, {id: 'galletas', name: 'Galletas'}, {id: 'bebidas', name: 'Bebidas'}, {id: 'snacks', name: 'Snacks'}, {id: 'dulces', name: 'Dulces'}, {id: 'lacteos', name: 'Lácteos'}, {id: 'carnes', name: 'Carnes'}, {id: 'frutas', name: 'Frutas'}, {id: 'verduras', name: 'Verduras'}, {id: 'otros', name: 'Otros'}]

export const defaultProducts: Product[] = [
  {
    id: '1234567890',
    categoryId: 'panaderia',
    name: 'Marraqueta (100g)',
    price: 230,
    stock: 1000,
    minStock: 50,
    description: 'Pan tradicional chileno.',
    image: 'https://rubybox-cdn.franciscosolis.cl/marraqueta.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '12984361',
    categoryId: 'galletas',
    name: 'Criollitas',
    price: 1090,
    stock: 500,
    minStock: 50,
    description: 'Galletas McKay Criollitas 80g',
    image: 'https://rubybox-cdn.franciscosolis.cl/criollitas.webp',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

export const currencyFormat = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})