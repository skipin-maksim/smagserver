// const moment = require("moment");
// const momentTimezone = require("moment-timezone");

// const dateNow = momentTimezone().tz("Europe/Kiev").format("DD-MM-YYYY HH:mm");

const Order = require("./model/orderModel");

const getAllOrders = async () => {
  return Order.find();
};

const getOrderById = (numOrder) => {
  return Order.findOne({ numOrder: numOrder });
};

const createOrder = (fields) => {
  return Order.create({ ...fields });
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
