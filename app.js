const express = require("express");
const app = express();
require("dotenv").config();
const middlewares = require("./midllwares/common")
const bodyParser = require("body-parser")
const router = require("./router")
var jwt = require('express-jwt');
const unless = require('express-unless')


app.use(middlewares.loger)

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// const publicRoute = ['/login','/user','/partner']
// app.use(jwt({ secret: 'aaaa'}).unless({path:publicRoute}));
app.use(router);



app.use(middlewares.wrongRoute);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8080

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})