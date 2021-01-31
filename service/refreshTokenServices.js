// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');
// require('dotenv').config();

// const SECRET_KEY = process.env.JWT_SECRET_KEY;

const RefreshToken = require('./model/refreshToken');

class RefreshTokenServ {
  constructor() {
    this.model = RefreshToken;
  }
  async findByToken(refreshToken) {
    const result = await this.model.findOne({ refreshToken });
    console.log('findByToken', result);
    return result;
  }

  async findById(id) {
    const result = await this.model.findOne({ userId: id });
    return result;
  }

  //add new token & id
  async add({ userId, refreshToken }) {
    return new this.model({
      userId,
      refreshToken,
    }).save();
  }

  remove = async userId => {
    console.log('remove refresh', userId);
    return await this.model.deleteMany({ userId });
  };
}

module.exports = new RefreshTokenServ();
