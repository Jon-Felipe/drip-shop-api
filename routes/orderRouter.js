import { Router } from 'express';
import { getOrders, createOrder } from '../controllers/orderController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { validateCreateOrders } from '../middleware/validationMiddleware.js';
const router = Router();

router
  .route('/')
  .get(getOrders)
  .post(authenticateUser, validateCreateOrders, createOrder);

export default router;
