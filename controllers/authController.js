import User from '../models/UserModel.js';
import { validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';

export async function register(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessage = result.array().map((error) => error.msg);
    throw new BadRequestError(errorMessage);
  }
  await User.create(req.body);
  res.status(201).json({ msg: 'user created' });
}

export function login(req, res) {
  res.send('login user');
}
