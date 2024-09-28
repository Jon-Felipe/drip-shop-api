import Order from '../models/OrderModel.js';

export async function createOrder(req, res) {
  const {
    orderItems,
    shippingAddress,
    shippingMethod,
    paymentMethod,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    user: req.user.userId,
    orderItems,
    shippingAddress,
    shippingMethod,
    paymentMethod,
    totalPrice,
  });
  res.status(200).json({ order });
}

export async function getOrders(req, res) {
  res.send('get orders');
}
