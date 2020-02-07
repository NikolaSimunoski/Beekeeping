const express = require("express");
var routes = express.Router();
var actions = require("./nucAction")
const validate = require("../midllwares/validator")


routes.get("/nuc/:id",validate.nucFarmIdExist,actions.getAllNuc)
routes.post("/nuc",actions.createNuc);
routes.put("/nuc/update/:id",validate.nucIdExist,actions.updateNuc);
routes.delete("/nuc/delete/:id",validate.nucIdExist,actions.deleteNuc);


module.exports = routes;