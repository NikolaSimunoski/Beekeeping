const express = require("express");
var routes = express.Router();
var actions = require("./weatherActions")




routes.get("/weather",actions.getCurentWeather);



module.exports = routes;