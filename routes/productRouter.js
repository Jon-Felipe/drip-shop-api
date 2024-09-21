import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import {
  validateGetProducts,
  validateIdParam,
} from '../middleware/validationMiddleware.js';
const router = Router();

router.route('/').get(validateGetProducts, getProducts).post(createProduct);
router
  .route('/:id')
  .get(validateIdParam, getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
