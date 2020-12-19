const Client = require("./model/clientModel");

const getAllClients = async () => {
  return Client.find();
};

const getTClientById = (id) => {
  return Client.findOne({ _id: id });
};

const createClient = ({
  id,
  firstName,
  secondName,
  thirdName,
  tel,
  email,
  city,
  post,
  debt,
}) => {
  return Client.create({
    id,
    firstName,
    secondName,
    thirdName,
    tel,
    email,
    city,
    post,
    debt,
  });
};

const updateClient = (id, fields) => {
  console.log(fields, "services");
  return Client.findByIdAndUpdate({ _id: id }, fields);
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
