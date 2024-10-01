import Order from '../models/OrderModel.js';

export async function createOrder(req, res) {
  const {
    orderItems,
    shippingAddress,
    shippingMethod,
    paymentMethod,
    totalPrice,
  } = req.body;
  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    shippingMethod,
    paymentMethod,
    totalPrice,
  });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
}

export async function getOrders(req, res) {
  res.send('get orders');
}
