const { User } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");
const { verifyToken } = require("../utils/authMiddleware");

const login = async (userData) => {
  try {
    const { email, password } = userData;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      throw new Error("User not found.");
    }
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password.");
    }
    const token = generateToken(userExist);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const refreshToken = async (oldToken) => {
  try {
    const { token } = oldToken;
    const decodedToken = verifyToken(token);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw new Error("User not found.");
    }
    const newToken = generateToken(user);
    return newToken;
  } catch (error) {
    throw new Error("Invalid token.");
  }
};

module.exports = {
  login,
  refreshToken,
};
