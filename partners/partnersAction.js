var con = require("../database")
var bcrypt = require('bcryptjs');



createPartnerUserQuery = (user, pass) => {
    var query = "INSERT INTO user(Name,Surname,Age,Email,Password,partner_key) VALUES (?,?,?,?,?,?)"
    return new Promise((resolve, reject) => {
        con.query(query, [user.Name, user.Surname, user.Age, user.Email,pass,user.partner_key], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

createPartnerUser = async (req, res) => {
    try {
        const userReq = req.body;
        const passHash = bcrypt.hashSync(userReq.Password, 10);
        await createPartnerUserQuery(userReq, passHash);
        const backData = await getUserIdQuery(userReq.partner_key);
        console.log(backData);
        await fillPartnersTableQuery(backData);
        res.status(200).send("NEW USER ADDED")
    } catch (error) {
        res.send(error);
    }
}


getUserIdQuery = (key) => {
    var query = "SELECT Id FROM user WHERE partner_key=?"
    return new Promise((resolve, reject) => {
        con.query(query, [key], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

fillPartnersTableQuery = (data) => {
    var query = "INSERT INTO partners(User1,User2,Owner_Id) VALUES (?,?,?)"
    return new Promise((resolve, reject) => {
        con.query(query, [data[0].Id,data[1].Id,data[0].Id], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}


module.exports = {createPartnerUser}