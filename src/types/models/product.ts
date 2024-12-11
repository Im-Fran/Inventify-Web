import { fakerES } from '@faker-js/faker';

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

export const generateUuid = (): string => fakerES.string.uuid()

export const createFakeProduct = (categories: ProductCategory[]): Product => ({
  id: fakerES.commerce.isbn({
    separator: '',
  }),
  categoryId: categories[fakerES.number.int({
    min: 0,
    max: categories.length - 1,
  })].id,
  name: fakerES.commerce.productName(),
  price: parseFloat(fakerES.commerce.price({
    symbol: '$',
    min: 1000,
    max: 99999,
    dec: 0,
  }).replace('$', '')),
  stock: fakerES.number.int({
    min: 1,
    max: 100,
  }),
  minStock: 1,
  description: fakerES.lorem.paragraph(),
  image: fakerES.image.url(),
  createdAt: fakerES.date.recent(),
  updatedAt: fakerES.date.recent(),
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
  },
  {
    id: '3718643412',
    categoryId: 'dulces',
    name: 'Mermelada Frutilla Watts',
    description: 'Mermelada Sin Azúcar 200g',
    price: 1150,
    stock: 1000,
    minStock: 50,
    image: 'https://rubybox-cdn.franciscosolis.cl/mermelada-watts-frutilla.webp',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '37615263418',
    categoryId: 'otros',
    name: 'Nova Doble Hoja',
    description: 'Toalla Nova Doble Hoja 100m Gigante',
    image: 'https://rubybox-cdn.franciscosolis.cl/nova-doble-hoja.webp',
    price: 4190,
    stock: 1000,
    minStock: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '48372498274',
    categoryId: 'bebidas',
    name: 'Nectar Watts Naranja',
    description: 'Jugo Nectar Watts Naranja Sin Azucar 1.5L',
    image: 'https://rubybox-cdn.franciscosolis.cl/watts-naranja.webp',
    price: 1850,
    stock: 1000,
    minStock: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '138947328917',
    categoryId: 'lacteos',
    name: 'Queso Quilque',
    description: 'Queso Quilque 500g',
    image: 'https://rubybox-cdn.franciscosolis.cl/queso-quilque.webp',
    price: 5690,
    stock: 1000,
    minStock: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '237468723648',
    categoryId: 'lacteos',
    name: 'Mantequilla Colun Con Sal',
    description: 'Mantequilla Colun Con Sal 250g',
    image: 'https://rubybox-cdn.franciscosolis.cl/mantequilla-colun.png',
    price: 2690,
    stock: 1000,
    minStock: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '382478231423478',
    categoryId: 'snacks',
    name: 'Doritos',
    description: 'Doritos Queso 285g',
    image: 'https://rubybox-cdn.franciscosolis.cl/doritos.webp',
    price: 2890,
    stock: 1000,
    minStock: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4238947892349',
    categoryId: 'snacks',
    name: 'Lays',
    description: 'Papas Fritas Lays Corte Americano 350g',
    image: 'https://rubybox-cdn.franciscosolis.cl/lays.webp',
    price: 2590,
    stock: 1000,
    minStock: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '238948732642',
    categoryId: 'bebidas',
    name: 'Nectar Manzana',
    description: 'Nectar Livean Manzana 200ml',
    image: 'https://rubybox-cdn.franciscosolis.cl/nectar-manzana.webp',
    price: 300,
    stock: 1000,
    minStock: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '23478236482',
    categoryId: 'bebidas',
    name: 'Coca-Cola Sin Azúcar',
    description: 'Coca-Cola Sin Azúcar 1.5L',
    image: 'https://rubybox-cdn.franciscosolis.cl/cocacola-sin-azucar-1.5l.webp',
    price: 2090,
    stock: 1000,
    minStock: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '328748326784238',
    categoryId: 'bebidas',
    name: 'Coca-Cola Sin Azucar Lata',
    description: 'Coca-Cola Sin Azúcar 350ml',
    image: 'https://rubybox-cdn.franciscosolis.cl/cocacola-sin-azucar-350ml.webp',
    price: 660,
    stock: 1000,
    minStock: 50,
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