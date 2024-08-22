import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    extraInfo: [String],
    image: String,
    price: Number,
    colour: String,
    size: String,
    material: String,
    brand: String,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
