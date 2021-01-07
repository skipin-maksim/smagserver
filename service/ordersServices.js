const moment = require("moment");
const date = moment("2021-01-07 18:58:00").zone(-240);
const dateNow = date.format("DD-MM-YYYY HH:mm");

const Order = require("./model/orderModel");

const getAllOrders = async () => {
  return Order.find();
};

const getOrderById = (numOrder) => {
  return Order.findOne({ numOrder: numOrder });
};

const createOrder = (fields) => {
  console.log("---------------dateNow", dateNow);
  return Order.create({ ...fields, date: dateNow });
};

const updateOrder = (id, fields) => {
  return Order.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeOrder = (id) => {
  return Order.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  removeOrder,
};
