import User from '../models/UserModel.js';
import { validationResult } from 'express-validator';
import {
  BadRequestError,
  UnauthenticatedError,
} from '../errors/customErrors.js';

export async function register(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessage = result.array().map((error) => error.msg);
    throw new BadRequestError(errorMessage);
  }
  await User.create(req.body);
  res.status(201).json({ msg: 'user created' });
}

export async function login(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessage = result.array().map((error) => error.msg);
    throw new BadRequestError(errorMessage);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePasswords(password))) {
    res.status(200).json({ user });
  } else {
    throw new UnauthenticatedError('Invalid credentials');
  }
}
