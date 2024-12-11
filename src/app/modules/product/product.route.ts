import { Router } from 'express';
import { ProductController } from './product.controller';

const router = Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllBicycle);
router.get('/:productId', ProductController.getSingleBicycle);
router.put('/:productId', ProductController.updateBicycle);
router.delete('/:productId', ProductController.deleteBicycle);

export const ProductRoutes = router;
