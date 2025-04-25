import { Router } from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';

const router = Router();

router.post('/', auth('customer'), OrderController.createOrder);

// Get all orders (accessible to admins only)
router.get('/', auth('admin'), OrderController.getAllOrders);
router.get('/user/orders', auth('customer'), OrderController.getUserOrders);
router.put(
  '/:orderId',
  auth('admin'),
  validateRequest(OrderValidation.updateOrderStatusValidationSchema),
  OrderController.updateOrderStatus,
);
router.delete('/:orderId', auth('admin'), OrderController.deleteOrder);

export const OrderRoutes = router;
