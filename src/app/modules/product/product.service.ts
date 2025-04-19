import status from 'http-status';
import AppError from '../../errors/AppError';
import { IProduct } from './product.interface';
import { Product } from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createProduct = async (product: IProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(query), query)
    .search(['name', 'brand', 'model'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = Product.findById(productId);
  return result;
};

const updateBicycle = async (productId: string, payload: IProduct) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(status.NOT_FOUND, 'Product not found');
  }

  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBicycle = async (productId: string) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError(status.NOT_FOUND, 'Product not found');
  }

  await Product.findByIdAndDelete(productId);
};

export const ProductServices = {
  createProduct,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateBicycle,
  deleteBicycle,
};
