const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const UsersServ = require("../../service/usersServices");
const { UnauthorizedError } = require("../../helpers/users/errors.constructor");

class AuthController {
  getUsersController = async (req, res, next) => {
    try {
      const users = await UsersServ.getUsers();

      res.json({
        status: "success",
        code: 200,
        message: "GET all users",
        users: users,
      });
    } catch (e) {
      next(e);
    }
  };

  getUserByIdController = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const user = await UsersServ.findById(userId);

      res.json({
        status: "success",
        code: 200,
        message: "GET user",
        user: user,
      });
    } catch (e) {
      next(e);
    }
  };

  registrationController = async (req, res, next) => {
    try {
      const { email } = req.body;
      const checkEmail = await UsersServ.findByEmail(email);
      if (checkEmail) {
        return res.status(409).send("'message': 'Email in use'");
      }
      const newUser = await UsersServ.createUser(req.body);
      res.status(201).json(newUser);
    } catch (e) {
      next(e);
    }
  };

  loginController = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await UsersServ.findByEmail(email);
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!user || !isPasswordValid) {
        return res.json({
          status: "success",
          code: 401,
          message: "Email or password is wrong",
        });
      }

      const token = await UsersServ.login(user);

      res.json({
        status: "success",
        code: 200,
        user: { email: user.email, _id: user._id, name: user.name },
        token: token,
      });
    } catch (e) {
      next(e);
    }
  };

  logoutController = async (req, res, next) => {
    console.log(req.user);
    try {
      const user = req.user;

      await UsersServ.logout(user._id);
      res.json({
        status: "success",
        code: 204,
        message: "Logout success",
      });
    } catch (e) {
      next(e);
    }
  };

  //check token
  authorize = async (req, res, next) => {
    try {
      const authorizationHeader = req.get("Authorization") || "";
      const token = authorizationHeader.replace("Bearer ", "");
      let userId;

      try {
        userId = await jwt.verify(token, process.env.JWT_SECRET_KEY).id;
      } catch (e) {
        console.log("error", e);
        next(res.status(401).json({ message: "Not authorized" }));
      }

      const user = await UsersServ.findById(userId);
      if (!user || user.token !== token) {
        throw new UnauthorizedError("Not authorized");
      }
      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      next(err);
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
        .send("missing required name field", validationRes.error);
    }
    next();
  };
}

module.exports = new AuthController();
