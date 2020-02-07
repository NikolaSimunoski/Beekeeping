
const mysql = require("mysql");
require('dotenv/config')
const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})


connection.connect((error) =>{
    if(error)throw error;
    console.log("DB CONNECTED!")
        
    
})

module.exports = connection