export type ProductStatus =
  | "ativo"
  | "consumido"
  | "descartado";

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expirationDate: string;
  status: ProductStatus;
}

export interface CreateProductDTO {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expirationDate: string;
}