import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (product: IProduct) => {
  const result = await Product.create(product);
  return result;
};

export const ProductServices = {
  createProduct,
};
