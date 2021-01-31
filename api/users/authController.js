const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const UsersServ = require('../../service/usersServices');
const refreshTokenServices = require('../../service/refreshTokenServices');
const RefreshToken = require('../../service/model/refreshToken');
const { UnauthorizedError } = require('../../helpers/users/errors.constructor');

class AuthController {
  getUsersController = async (req, res, next) => {
    try {
      const users = await UsersServ.getUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  };

  getUserByIdController = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const user = await UsersServ.findById(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  };

  registrationController = async (req, res, next) => {
    try {
      const { email } = req.body;
      const checkEmail = await UsersServ.findByEmail({ email });
      if (checkEmail) {
        return res.status(409).send("'message': 'This Email is already use'");
      }
      const newUser = await UsersServ.createUser(req.body);
      res.status(201).json({
        data: {
          id: newUser._id, //id
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (e) {
      next(e);
    }
  };

  loginController = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const user = await UsersServ.findByEmail({ email });
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!user || !isPasswordValid) {
        return res.status(401).send('Email or password is wrong');
      }

      const { token, refreshToken } = await UsersServ.login(user); //jwtToken+update user
      await refreshTokenServices.add({
        userId: user._id,
        refreshToken,
      }); //add refreshToken

      res.status(200).json({
        data: { token, refreshToken, email, name },
      });
    } catch (e) {
      next(e);
    }
  };

  logoutController = async (req, res, next) => {
    try {
      const user = req.user;
      await UsersServ.logout(user._id);
      // console.log('logoutController', user._id);
      await refreshTokenServices.remove(user._id);
      res.status(204).json({ message: 'Logout success' });
    } catch (e) {
      next(e);
    }
  };
  current = async (req, res, next) => {
    try {
      const user = req.user;
      await UsersServ.findById(user._id);
      res.json({ data: { user } });
    } catch (e) {
      next(e);
    }
  };
  //check token
  authorize = async (req, res, next) => {
    try {
      const authorizationHeader = req.get('Authorization') || '';
      const token = authorizationHeader.replace('Bearer ', '');
      let userId;

      try {
        userId = await jwt.verify(token, process.env.JWT_SECRET_KEY).id;
      } catch (e) {
        console.log('error', e);
        next(res.status(401).json({ message: 'Not authorized' }));
      }
      console.log('userID', userId);
      const user = await UsersServ.findById(userId);
      if (!user) {
        throw new UnauthorizedError('Not authorized');
      }
      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      next(err);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const dataRefresh = await RefreshToken.find({ refreshToken });
      const userId = dataRefresh.reduce((acc, i) => {
        acc[i.name] = i;
      }).userId;

      if (!userId) {
        return;
      }
      // await refreshTokenServices.remove({ refreshToken });/////use once
      const user = await UsersServ.findById(userId);
      const pairToken = await UsersServ.login(user); //jwtToken added to user

      console.log(pairToken); ///
      const newRefreshToken = pairToken.refreshToken;
      const newToken = pairToken.token;

      await refreshTokenServices.add({
        userId: userId,
        refreshToken: newRefreshToken,
      });

      res.status(200).json({
        data: { newToken, newRefreshToken },
      });
    } catch (e) {
      next(e);
    }
  };

  //check email & pass
  validateAuth = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const validationRes = schema.validate(req.body);

    if (validationRes.error) {
      return res
        .status(400)
        .send('missing required name field', validationRes.error);
    }
    next();
  };
}

module.exports = new AuthController();
