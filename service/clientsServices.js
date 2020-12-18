const Client = require("./model/clientModel");

const getAllClients = async () => {
  return Client.find();
};

const getTClientById = (id) => {
  return Client.findOne({ _id: id });
};

const createClient = ({ name, email, phone }) => {
  return Client.create({ name, email, phone });
};

const updateClient = (id, fields) => {
  return Client.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeClient = (id) => {
  return Client.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllClients,
  getTClientById,
  createClient,
  updateClient,
  removeClient,
};
