const Order = require("./model/orderModel");

const getAllOrders = async () => {
  return Order.find();
};

const getOrderById = (numOrder) => {
  return Order.findOne({ numOrder: numOrder });
};

const createOrder = ({
  items,
  calculatedTotals,
  clientInfo,
  isSaved,
  isEdit,
  prepayment,
  noteForOrder,
  numOrder,
}) => {
  return Order.create({
    items,
    calculatedTotals,
    clientInfo,
    isSaved,
    isEdit,
    prepayment,
    noteForOrder,
    numOrder,
  });
};

const updateOrder = (id, fields) => {
  return Order.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeOrder = (numOrder) => {
  return Order.findByIdAndRemove({ numOrder: numOrder });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  removeOrder,
};
