import { ProductServices } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProduct(req.body);

  sendResponse(res, {
    success: true,
    message: 'Bicycle created successfully',
    statusCode: status.CREATED,
    data: result,
  });
});

const getAllBicycle = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductFromDB(req.query);

  sendResponse(res, {
    success: true,
    message: 'Bicycles retrieved successfully',
    statusCode: status.OK,
    data: result,
  });
});

const getSingleBicycle = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);
  sendResponse(res, {
    success: true,
    message: 'Bicycle retrieved successfully',
    statusCode: status.OK,
    data: result,
  });
});

const updateBicycle = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = req.body;
  const result = await ProductServices.updateBicycle(productId, product);

  sendResponse(res, {
    success: true,
    message: 'Bicycle updated successfully',
    statusCode: status.OK,
    data: result,
  });
});

const deleteBicycle = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await ProductServices.deleteBicycle(productId);
  sendResponse(res, {
    success: true,
    message: 'Bicycle deleted successfully',
    statusCode: status.OK,
    data: null,
  });
});

export const ProductController = {
  createProduct,
  getAllBicycle,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle,
};
