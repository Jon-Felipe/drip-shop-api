import { Router } from 'express';
import { body } from 'express-validator';
import User from '../models/UserModel.js';
import { BadRequestError } from '../errors/customErrors.js';
import { register, login } from '../controllers/authController.js';
const router = Router();

router.post(
  '/register',
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new BadRequestError('Email already exists');
      }
    })
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  register
);
router.post('/login', login);

export default router;
