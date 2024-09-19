import { body, query, validationResult } from 'express-validator';
import User from '../models/UserModel.js';
import { BadRequestError } from '../errors/customErrors.js';

function withValidationErrors(validationValues) {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((e) => e.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
}

// register validation
export const validateRegisterInput = withValidationErrors([
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
]);

// login validation
export const validateLoginInput = withValidationErrors([
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
]);

// get products validation
export const validateGetProducts = withValidationErrors([
  query('search').trim().notEmpty().withMessage('Search query is required'),
]);
