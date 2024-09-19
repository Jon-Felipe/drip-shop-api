import Product from '../models/ProductModel.js';

export async function getProducts(req, res) {
  const { search } = req.query;
  const products = await Product.find({
    title: { $regex: search, $options: 'i' },
  });
  res.status(200).json({ products });
}

export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  res.status(200).json({ product });
}

export async function createProduct(req, res) {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
}

export async function updateProduct(req, res) {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: 'true' }
  );
  res.status(200).json({ product: updatedProduct });
}

export async function deleteProduct(req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: 'product deleted' });
}
