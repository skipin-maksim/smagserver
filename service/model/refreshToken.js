const mongoose = require('mongoose');
const { Schema } = mongoose;

const refreshTokenSchema = new Schema(
  { userId: String, refreshToken: String },
  { versionKey: false, timestamps: true }
);

const RefreshToken = mongoose.model('refreshToken', refreshTokenSchema);

module.exports = RefreshToken;
