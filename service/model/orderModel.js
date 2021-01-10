const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema(
  {
    id: String,
    items: Array,
    calculatedTotals: Object,
    clientInfo: Object,
    isSaved: Boolean,
    isEdit: Boolean,
    prepayment: Number,
    noteForOrder: String,
    orderNum: String,
    status: String,
    date: String,
    updatedDate: String,
    status: String,
  },
  { versionKey: false, timestamps: true }
);

const Order = mongoose.model("order", order);

module.exports = Order;
