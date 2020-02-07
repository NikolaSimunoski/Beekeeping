const express = require("express");
var routes = express.Router();
var actions = require("./totalHoneyAction")


routes.get("/totalHoneyAction",actions.getTotalHoneyYeld)

module.exports = routes;