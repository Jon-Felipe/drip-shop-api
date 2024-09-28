import { Router } from 'express';
import { getOrders, createOrder } from '../controllers/orderController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
const router = Router();

router.route('/').get(getOrders).post(authenticateUser, createOrder);

export default router;
