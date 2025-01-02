import { Router } from 'express';
import { OrderController } from './order.controller';

const router = Router();

router.post('/', OrderController.createOrder);
router.get('/revenue', OrderController.calculateTotalRevenue);

export const OrderRoutes = router;
