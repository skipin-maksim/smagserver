const NumOrder = require("./model/numOrderModel");

const getNumOrder = async () => {
  return NumOrder.find();
};

const updateNumOrder = (id, fields) => {
  return NumOrder.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

module.exports = {
  getNumOrder,
  updateNumOrder,
};
