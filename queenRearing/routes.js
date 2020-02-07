const express = require("express");
var routes = express.Router();
var actions = require("./queenAction")
const validate = require("../midllwares/validator")


routes.get("/queen/:id",validate.queenFarmIdExist,actions.getAllQueenNuc)
routes.post("/queen",actions.createQueenRearing);
routes.put("/queen/update/:id",validate.queenIdExist,actions.updateQueenNucs);
routes.delete("/queen/delete/:id",validate.queenIdExist,actions.deleteQueenNuc);


module.exports = routes;