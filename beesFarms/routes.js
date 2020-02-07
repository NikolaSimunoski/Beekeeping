const express = require("express");
var routes = express.Router();
var actions = require("./farmsActions")
const validate = require("../midllwares/validator")



routes.post("/farm",validate.createFarmValidate,actions.createFarm);
routes.delete("/farm/:id",actions.deleteFarm);
routes.get("/farms/:id",validate.farmIdExist,actions.getAllUserFarms)



module.exports = routes;