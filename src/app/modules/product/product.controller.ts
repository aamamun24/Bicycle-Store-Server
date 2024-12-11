import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

// Create a Bicycle
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = productValidationSchema.parse(req.body);
    const result = await ProductServices.createProduct(productData);

    res.status(200).json({
      message: 'Bicycle created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Something went wrong!',
      success: false,
      error: error,
    });
  }
};

// Get All Bicycles
const getAllBicycle = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
          { type: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const result = await ProductServices.getAllProductFromDB(query);

    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Failed to retrieve products',
      status: false,
      error,
    });
  }
};

// Get a Specific Bicycle
const getSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Failed to retrieve products',
      status: false,
      error,
    });
  }
};

// Update a Bicycle
const updateBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = req.body;

    const result = await ProductServices.updateBicycle(productId, product);
    res.status(200).json({
      message: 'Bicycle updated successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Something went wrong!',
      status: false,
      error,
    });
  }
};

// Delete a bicycle
const deleteBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await ProductServices.deleteBicycle(productId);
    res.status(200).json({
      message: 'Bicycle deleted successfully',
      status: true,
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Failed to delete',
      status: false,
      error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllBicycle,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle,
};
