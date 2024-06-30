import User from '../models/UserModel.js';

export async function register(req, res, next) {
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  try {
    if (userExists) {
      throw new Error('user exists');
    } else {
      await User.create(req.body);
      res.status(201).json({ msg: 'user created' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export function login(req, res) {
  res.send('login user');
}
