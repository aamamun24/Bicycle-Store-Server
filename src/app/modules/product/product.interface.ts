export interface IProduct {
  name: string;
  brand: string;
  price: string;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
}
