const momentTimezone = require('moment-timezone');
const { v4: uuidv4 } = require('uuid');

const dateNow = () =>
  momentTimezone().tz('Europe/Kiev').format('DD-MM-YYYY HH:mm');

let orderNum = 0;
let orderNumString = '';

const editCustomNumber = value => ('000000' + (value + 1)).substr(-6);

const changeNumOrder = value => {
  orderNumString = editCustomNumber(value);
  orderNum += 1;

  return orderNumString;
};

const Order = require('./model/orderModel');

//////
const getAllOrders = async () => {
  return Order.find();
};

///

const getOrderById = numOrderServer => {
  return Order.findOne({ orderNum: numOrderServer });
};

const createOrder = (fields, userId) => {
  const newOrderNum = changeNumOrder(orderNum);

  return Order.create({
    ...fields,
    id: newOrderNum,
    date: dateNow(),
    updatedDate: '',
    status: 'Не обработан',
    orderNum: newOrderNum,
    owner: userId,
  });
};

const updateOrder = (id, fields) => {
  return Order.findByIdAndUpdate(
    { _id: id },
    { ...fields, updatedDate: dateNow() },
    { new: true }
  );
};

const removeOrder = id => {
  return Order.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  removeOrder,
};
