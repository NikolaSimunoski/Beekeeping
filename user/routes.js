const express = require("express");
var routes = express.Router();
var actions = require("./userAction")
const validate = require("../midllwares/validator")


routes.get("/users", actions.getAllUsers)
routes.post("/user", validate.validateUser,actions.createUser)
routes.delete("/user/delete/:id",actions.deleteUser)
routes.get("/user/:id",actions.getSpecificUser)
routes.put("/user/update/:id",validate.idExist,actions.updateUser)
routes.post("/login",actions.logInUser)
routes.get("/users/report",actions.getAllUsersHoneyHivesReport)
routes.get("/user/report/:id",validate.idExist,actions.getSpecificUserHoneyHivesReport)

module.exports = routes