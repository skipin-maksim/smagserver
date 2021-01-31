const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const numorder = new Schema(
  {
    valueNum: Number,
    valueStr: String,
  },
  { versionKey: false, timestamps: true }
);

const NumOrder = mongoose.model("numorder", numorder);

module.exports = NumOrder;
