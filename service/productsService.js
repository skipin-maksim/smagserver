const Product = require("./model/productModel");

const getAllProducts = async () => {
  return Product.find();
};

const getTProductById = (id) => {
  return Product.findOne({ vendorCode: id });
};

const createProduct = ({ provider, vendorCode, prices }) => {
  return Product.create({ provider, vendorCode, prices });
};

const updateProduct = (id, fields) => {
  return Product.findByIdAndUpdate({ vendorCode: id }, fields, { new: true });
};

const removeProduct = (id) => {
  return Product.findByIdAndRemove({ vendorCode: id });
};

module.exports = {
  getAllProducts,
  getTProductById,
  createProduct,
  updateProduct,
  removeProduct,
};
