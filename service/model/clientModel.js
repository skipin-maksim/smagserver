const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const client = new Schema(
  {
    id: Number,
    firstName: { type: String, required: true, minlength: 2 },
    secondName: String,
    thirdName: String,
    tel: String,
    email: String,
    city: String,
    post: String,
    debt: Number,
  },
  { versionKey: false, timestamps: true }
);

const Client = mongoose.model("client", client);

module.exports = Client;
