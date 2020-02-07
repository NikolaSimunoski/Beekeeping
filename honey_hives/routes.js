const express = require("express");
var routes = express.Router();
var actions = require("./honeyActions")
const validate = require("../midllwares/validator")


routes.get("/honeyHive/:id",validate.honeyHiveFarmIdExist,actions.getAllhoneyHive)
routes.post("/honeyHive",actions.createhoneyHive);
routes.put("/honeyHive/update/:id",validate.honeyHiveIdExist,actions.updatehoneyHive);
routes.delete("/honeyHive/delete/:id",validate.honeyHiveIdExist,actions.deletehoneyHive);


module.exports = routes;