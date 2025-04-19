import { Router } from 'express';
import { ProductController } from './product.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.validation';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(ProductValidation.createProductValidationSchema),
  ProductController.createProduct,
);
router.put(
  '/:productId',
  auth('admin'),
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductController.updateBicycle,
);
router.delete('/:productId', auth('admin'), ProductController.deleteBicycle);
router.get('/', ProductController.getAllBicycle);
router.get('/:productId', ProductController.getSingleBicycle);

export const ProductRoutes = router;
