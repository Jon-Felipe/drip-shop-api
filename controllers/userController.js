import User from '../models/UserModel.js';

export async function getCurrentUser(req, res) {
  const user = await User.findOne({ _id: req.user.userId }).select('-password');
  res.status(200).json({ user });
}

export async function updateUser(req, res) {
  res.send('update user');
}
