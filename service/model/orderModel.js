const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema(
  {
    items: Array,
    calculatedTotals: Object,
    clientInfo: Object,
    isSaved: Boolean,
    isEdit: Boolean,
    prepayment: Number,
    noteForOrder: String,
    numOrder: String,
    numOrderServer: String,
    status: String,
    date: String,
    updatedDate: String,
  },
  { versionKey: false, timestamps: true }
);

const Order = mongoose.model("order", order);

module.exports = Order;
