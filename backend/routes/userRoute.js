const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controller/userController");

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.post("/logout", logoutUser);


module.exports = route;