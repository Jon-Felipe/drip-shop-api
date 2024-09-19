import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { validateGetProducts } from '../middleware/validationMiddleware.js';
const router = Router();

router.route('/').get(validateGetProducts, getProducts).post(createProduct);
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

export default router;
