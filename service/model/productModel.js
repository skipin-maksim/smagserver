const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema(
  {
    provider: String,
    vendorCode: String,
    prices: {
      retail: Number,
      wholesale: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

const Product = mongoose.model("product", product);

module.exports = Product;
