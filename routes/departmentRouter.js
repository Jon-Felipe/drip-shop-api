import { Router } from 'express';
import {
  getDepartment,
  createDepartment,
} from '../controllers/departmentController.js';
const router = Router();

router.post('/', createDepartment);
router.get('/:department', getDepartment);

export default router;
