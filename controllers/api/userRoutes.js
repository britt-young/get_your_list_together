const express = require("express");
// const sequelize = require("../../config/connection");
const firebase = require("@firebase/app");
require("@firebase/auth");
const router = express.Router();
const { User } = require("../../models");



// Call the asynchronous function when handling a request, for example in an Express route
router.post('/login', async (req, res) => {
  await createUser(req, res);
});






module.exports = router;
