import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (product: IProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductFromDB = async (query: any) => {
  const result = await Product.find(query);
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = Product.findById(productId);
  return result;
};

const updateBicycle = async (productId: string, product: IProduct) => {
  const result = await Product.findByIdAndUpdate(productId, product, {
    new: true,
  });
  return result;
};

const deleteBicycle = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateBicycle,
  deleteBicycle,
};
