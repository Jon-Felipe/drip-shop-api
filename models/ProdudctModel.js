import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    extraInfo: [String],
    image: String,
    price: Number,
    colour: String,
    brand: String,
    material: String,
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);