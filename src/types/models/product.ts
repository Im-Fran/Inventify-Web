import { faker } from '@faker-js/faker';

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  minStock: number;
  description: string;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createFakeProduct = (): Product => ({
  id: faker.commerce.isbn({
    separator: '',
  }),
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
  category: faker.commerce.department(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
})

export const products = faker.helpers.multiple(createFakeProduct, {
  count: 50,
})

export const currencyFormat = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})