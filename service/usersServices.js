const jwt = require('jsonwebtoken');
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
    return result;
  }

  async findByEmail(email) {
    const result = await this.model.findOne({ email });
    return result;
  }

  //register
  async createUser(body) {
    const user = new this.model(body);
    return user.save();
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
  }

  login = async user => {
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await this.updateToken(id, token);
    return token;
  };

  logout = async userId => {
    return await this.updateToken(userId, null);
  };
}

module.exports = new UsersServ();
