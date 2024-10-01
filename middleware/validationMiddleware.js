import { body, query, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import Product from '../models/ProductModel.js';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';

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

// validate id param
export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongodId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongodId) throw new BadRequestError('Invalid MongoDB ID');
    const product = await Product.findById(value);
    if (!product) throw new NotFoundError(`No product found with ID: ${value}`);
  }),
]);

// get products validation
export const validateGetProducts = withValidationErrors([
  query('search').trim().notEmpty().withMessage('Search query is required'),
]);

// create orders validation
export const validateCreateOrders = withValidationErrors([
  body('orderItems')
    .notEmpty()
    .isArray({ min: 1 })
    .withMessage('Order items is required'),
  body('shippingAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Street is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.postalcode')
    .trim()
    .notEmpty()
    .withMessage('Postalcode is required'),
  body('shippingAddress.country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  body('shippingMethod')
    .trim()
    .notEmpty()
    .withMessage('Shipping Method is required'),
  body('paymentMethod')
    .trim()
    .notEmpty()
    .withMessage('Payment Method is required'),
]);
