const express = require("express");
const userRoute = express.Router();

const {
  getUser,
  getMaleUsers,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  register,
  login,
  auth,
  tokenIsValid,
} = require("../controllers/authController");

userRoute.get("/getUser/:id", getUser);
userRoute.get("/getUsers", getUsers);
userRoute.get("/getMaleUsers", auth, getMaleUsers);
userRoute.post("/createUser", register);
userRoute.post("/login", login);
userRoute.post("/tokenIsValid", tokenIsValid);
userRoute.put("/updateUser/:id", updateUser);
userRoute.delete("/deleteUser/:id", deleteUser);

module.exports = {
  userRoute,
};
