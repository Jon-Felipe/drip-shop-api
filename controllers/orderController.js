import Order from '../models/OrderModel.js';

export async function createOrder(req, res) {
  const order = new Order({ user: req.user._id, ...req.body });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
}

export async function getOrders(req, res) {
  res.send('get orders');
}
