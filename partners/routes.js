const express = require("express");
const routes = express.Router();
const actions = require("./partnersAction")
const validate = require("../midllwares/validator")


routes.post('/partner',validate.keyExist,actions.createPartnerUser)


module.exports = routes