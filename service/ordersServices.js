const momentTimezone = require("moment-timezone");
const service = require("../service/numOrderServices");

const dateNow = () =>
  momentTimezone().tz("Europe/Kiev").format("DD-MM-YYYY HH:mm");

const editCustomNumber = (value) => ("000000" + (value + 1)).substr(-6);

const changeNumOrder = async () => {
  const [numOrderObj] = await service.getNumOrder();

  const orderNumString = editCustomNumber(numOrderObj.numOrder);

  // await service.updateNumOrder("600d5c539d5d2f0de8a96286", {
  //   numOrder: numOrderObj.numOrder + 1,
  // });

  return orderNumString;
};

const Order = require("./model/orderModel");

const getAllOrders = async () => {
  return Order.find();
};

const getOrderById = (numOrderServer) => {
  return Order.findOne({ orderNum: numOrderServer });
};

const createOrder = async (fields) => {
  const newOrderNum = await changeNumOrder();
  console.log(
    "--------------------******************--------------------",
    newOrderNum
  );

  return Order.create({
    ...fields,
    id: newOrderNum,
    date: dateNow(),
    updatedDate: "",
    status: "Не обработан",
    orderNum: newOrderNum,
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
