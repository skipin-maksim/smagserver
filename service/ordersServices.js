const momentTimezone = require("moment-timezone");
const { v4: uuidv4 } = require("uuid");

const dateNow = () =>
  momentTimezone().tz("Europe/Kiev").format("DD-MM-YYYY HH:mm");

let numOrder = 0;
let numOrderString = "";

const editCustomNumber = (value) => ("000000" + (value + 1)).substr(-6);

const changeNumOrder = (value) => {
  numOrderString = editCustomNumber(value);
  numOrder += 1;

  return numOrderString;
};

const Order = require("./model/orderModel");

const getAllOrders = async () => {
  return Order.find();
};

const getOrderById = (numOrder) => {
  return Order.findOne({ numOrder: numOrder });
};

const createOrder = (fields) => {
  const newNumOrder = changeNumOrder(numOrder);

  return Order.create({
    ...fields,
    id: newNumOrder,
    date: dateNow(),
    updatedDate: "",
    status: "Не обработан",
    numOrderServer: newNumOrder,
  });
};

const updateOrder = (id, fields) => {
  return Order.findByIdAndUpdate(
    { _id: id },
    { ...fields, updatedDate: dateNow() },
    { new: true }
  );
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
