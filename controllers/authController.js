import User from '../models/UserModel.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  const user = await User.create(req.body);
  res
    .status(201)
    .json({
      _id: user._id,
      fisrtName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePasswords(password))) {
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      _id: user._id,
      fisrtName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    throw new UnauthenticatedError('Invalid credentials');
  }
}
