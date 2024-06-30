import User from '../models/UserModel.js';
import { BadRequestError } from '../errors/customErrors.js';

export async function register(req, res, next) {
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError('email already exists');
  } else {
    await User.create(req.body);
    res.status(201).json({ msg: 'user created' });
  }
}

export function login(req, res) {
  res.send('login user');
}
