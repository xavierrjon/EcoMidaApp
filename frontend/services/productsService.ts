import { products } from "@/data/products";

import {
  Product,
  CreateProductDTO,
} from "@/types/product";

let productsMock: Product[] = [...products];

export const productsService = {
  async getAll(): Promise<Product[]> {
    return productsMock;
  },

  async create(
    product: CreateProductDTO
  ): Promise<Product> {
    const newProduct: Product = {
      id: Date.now().toString(),
      ...product,
      status: "ativo",
    };

    productsMock = [
      newProduct,
      ...productsMock,
    ];

    return newProduct;
  },

  async update(
    id: string,
    data: Partial<Product>
  ): Promise<Product | null> {
    const index = productsMock.findIndex(
      (product) => product.id === id
    );

    if (index === -1) {
      return null;
    }

    productsMock[index] = {
      ...productsMock[index],
      ...data,
    };

    return productsMock[index];
  },

  async delete(
    id: string
  ): Promise<void> {
    productsMock =
      productsMock.filter(
        (product) => product.id !== id
      );
  },
};