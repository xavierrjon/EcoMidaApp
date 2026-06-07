export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  expirationDate: string;
  status: "ativo" | "consumido" | "descartado";
}

export const products: Product[] = [
  {
    id: "1",
    name: "Leite Líquido",
    category: "Laticínio",
    quantity: 2,
    expirationDate: "15/06/2026",
    status: "ativo",
  },

  {
    id: "2",
    name: "Alface",
    category: "Legume",
    quantity: 1,
    expirationDate: "08/06/2026",
    status: "ativo",
  },

  {
    id: "3",
    name: "Pão Integral",
    category: "Padaria",
    quantity: 3,
    expirationDate: "05/06/2026",
    status: "consumido",
  },

  {
    id: "4",
    name: "Suco de Laranja",
    category: "Bebida",
    quantity: 1,
    expirationDate: "02/06/2026",
    status: "descartado",
  },
];