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

export const productCategories = faker.helpers.multiple(createFakeProductCategory, {
  count: 10,
})

export const products = (categories: ProductCategory[]) => faker.helpers.multiple(() => createFakeProduct(categories), {
  count: 50,
})

export const currencyFormat = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})