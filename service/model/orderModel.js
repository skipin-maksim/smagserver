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
    // "id": "00022",
    // "date": "19-12-2020 01:16"
  },
  { versionKey: false, timestamps: true }
);

const Order = mongoose.model("order", order);

module.exports = Order;
