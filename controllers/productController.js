import Product from '../models/ProdudctModel.js';

export async function getProducts(req, res) {
  const products = await Product.find({});
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
  res.send('update product');
}

export async function deleteProduct(req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: 'product deleted' });
}
