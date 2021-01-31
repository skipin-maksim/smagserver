const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const User = require('./model/userModel');

class UsersServ {
  constructor() {
    this.model = User;
  }

  async getUsers() {
    return await this.model.find();
  }

  async findById(id) {
    const result = await this.model.findOne({ _id: id });
    // console.log('user', result);
    return result;
  }

  async findByEmail(email) {
    const result = await this.model.findOne(email);
    return result;
  }

  //register
  async createUser(body) {
    const user = new this.model(body);
    return user.save();
  }

  login = async user => {
    const id = user._id;
    const payload = { id };
    const refreshToken = uuidv4();
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5m' });
    await this.updateByField(id, token);
    return { token, refreshToken };
  };

  updateByField = async (id, field) => {
    await this.model.updateOne({ _id: id }, { field });
  };

  // refresh = async user => {
  //   const id = user._id;
  //   const payload = { id };
  //   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' });
  //   await this.updateByField(id, token);
  //   return token;
  // };

  logout = async userId => {
    return await this.model.findByIdAndUpdate(userId, { token: null });
  };
}

module.exports = new UsersServ();
