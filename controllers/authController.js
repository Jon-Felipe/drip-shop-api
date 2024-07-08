import User from '../models/UserModel.js';
import { UnauthenticatedError } from '../errors/customErrors.js';

export async function register(req, res, next) {
  await User.create(req.body);
  res.status(201).json({ msg: 'user created' });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePasswords(password))) {
    res.status(200).json({ user });
  } else {
    throw new UnauthenticatedError('Invalid credentials');
  }
}
