const Response = require("./Response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

class User extends Response {
  signup = async (req, res) => {
    try {
      const { email, username, password, city, role } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return this.sendResponse(req, res, {
          message: "User already exists",
          status: 400,
        });
      }

      const newUser = new UserModel({
        email,
        username,
        password,
        city,
        role,
      });

      await newUser.save();

      // Optionally log the creation event
      // auditLogger("User signup", { userId: newUser._id });

      return this.sendResponse(req, res, {
        message: "User registered successfully",
        status: 201,
        data: { email, username, city, role },
      });
    } catch (error) {
      return this.sendResponse(req, res, {
        message: "Error registering user",
        status: 500,
        data: { error: error.message },
      });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        return this.sendResponse(req, res, {
          message: "Invalid credentials",
          status: 400,
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return this.sendResponse(req, res, {
          message: "Invalid credentials",
          status: 400,
        });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return this.sendResponse(req, res, {
        message: "Logged in successfully",
        status: 200,
        data: { token },
      });
    } catch (error) {
      return this.sendResponse(req, res, {
        message: "Error logging in",
        status: 500,
        data: { error: error.message },
      });
    }
  };
}

module.exports = User;
