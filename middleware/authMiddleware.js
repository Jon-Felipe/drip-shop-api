import jwt from 'jsonwebtoken';

export function authenticateUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    throw new Error('Authentication invalid');
  }
  try {
    const { userId } = jwt.decode(token, 'secret');
    req.user = { userId };
    next();
  } catch (error) {
    throw new Error('Authentication invalid');
  }
}
