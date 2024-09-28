import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orderItems: [
      {
        title: String,
        price: Number,
        quantity: Number,
        size: String,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    orderStatus: {
      type: String,
      default: 'executed',
    },
    shippingAddress: {
      street: String,
      city: String,
      postalcode: String,
      country: String,
    },
    shippingMethod: String,
    paymentMethod: String,
    totalPrice: Number,
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
