var con = require("../database")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');

logInQuery = (email) => {
    const query = 'SELECT * FROM user WHERE Email = ?';
  return new Promise((resolve,reject) =>{
    con.query(query,[email],(error, results, fields) => {
        if (error){
            reject(error);
        }else{
            resolve(results)
        }
        
      });
});
}

logInUser = async(req, res) => {
    try {
        var pom = req.body.Email;
        var pomSec = req.body.Password;
        const users = await logInQuery(pom);
        var newUser = users[0];
        const matchPass = bcrypt.compareSync(pomSec, newUser.Password)
        if(matchPass){
            var token = jwt.sign({ newUser }, 'aaaa', { expiresIn: '1h'});
            res.status(200).send(token)
        }else {
            res.status(404).send("Wrong Password");
        }     
    } catch (error) {
        res.send(error.message)
    }
    
}

getAllUsersQuery = () => {
    var query = "SELECT * FROM user"
    return new Promise((resolve, reject) => {
        con.query(query, (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

getAllUsers = async (req, res) => {
    try {
        var data = await getAllUsersQuery();
        res.status(200).send(data)
    } catch (error) {
        res.send(error);
    }
}

createUserQuery = (user, pass,x) => {
    var query = "INSERT INTO user(Name,Surname,Age,Email,Password,partner_key) VALUES (?,?,?,?,?,?)"
    return new Promise((resolve, reject) => {
        con.query(query, [user.Name, user.Surname, user.Age, user.Email,pass,x], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

createUser = async (req, res) => {
    try {
       
        const userReq = req.body;
        const passHash = bcrypt.hashSync(userReq.Password, 10);
        const PartnerKey = cryptoRandomString({length: 10});
        await createUserQuery(userReq, passHash,PartnerKey);
        res.status(200).send("NEW USER ADDED")
    } catch (error) {
        res.send(error);
    }
}


deleteUserQuery = (usrId) => {
    var query = "DELETE FROM user WHERE Id = ?"
    return new Promise((resolve, reject) => {
        con.query(query, [usrId], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

deleteUser = async (req, res) => {
    try {
        const userToDelete = req.params.id;
        console.log(userToDelete)
        await deleteUserQuery(userToDelete);
        res.status(200).send("User is Deleted!")
    } catch (error) {
        res.send(error);
    }
}

getSpecificUserQuery = (usrId) => {
    var query = "SELECT * FROM user WHERE Id = ?"
    return new Promise((resolve, reject) => {
        con.query(query, [usrId], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            const found = result.some(element => element.Id == usrId)
            if (found) {
                resolve(result)
            }
            else {
                resolve("User doesn't exist")
            }
        })
    })
}

getSpecificUser = async (req, res) => {
    try {
        const user = req.params.id;
        console.log(user)
        const data = await getSpecificUserQuery(user);
        res.status(200).send(data)
    } catch (error) {
        res.send(error);
    }
}

updateUserQuery = (userId, pass) => {
    var query = "UPDATE user SET Password = ? WHERE Id = ?"
    return new Promise((resolve, reject) => {
        con.query(query, [pass, userId], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

updateUser = async (req, res) => {
    try {
        const userReq = req.params.id;
        const userNewPass = req.body
        const passHash = bcrypt.hashSync(userNewPass.Password, 10);
        await updateUserQuery(userReq, passHash);
        res.status(200).send("Your password is changed")
    } catch (error) {
        res.send(error);
    }
}


getAllUsersHoneyHivesReportQuery = () => {
    var query = "SELECT user.Name, user.Surname, bees_farms.Place, honey_hives.Queen_Family,honey_hives.Queen_Year,honey_hives.Start_Date,honey_hives.Food_Condition,honey_hives.Treatment  FROM user,bees_farms,honey_hives WHERE user.Id=bees_farms.Owner_Id AND bees_farms.Farm_Id=honey_hives.Farm_Id ORDER BY Name"
    return new Promise((resolve, reject) => {
        con.query(query, (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

getAllUsersHoneyHivesReport = async (req, res) => {
    try {
        var data = await getAllUsersHoneyHivesReportQuery();
        res.status(200).send(data)
    } catch (error) {
        res.send(error);
    }
}

getSpecificUserHoneyHivesReportQuery = (x) => {
    var query = "SELECT user.Name, user.Surname, bees_farms.Place, honey_hives.Queen_Family,honey_hives.Queen_Year,honey_hives.Start_Date,honey_hives.Food_Condition,honey_hives.Treatment  FROM user,bees_farms,honey_hives WHERE user.Id=bees_farms.Owner_Id AND bees_farms.Farm_Id=honey_hives.Farm_Id AND user.Id = ?  ORDER BY Name"
    return new Promise((resolve, reject) => {
        con.query(query,[x], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

getSpecificUserHoneyHivesReport = async (req, res) => {
    try {
        usr = req.params.id
        var data = await getSpecificUserHoneyHivesReportQuery(usr);
        res.status(200).send(data)
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getAllUsers, createUser, deleteUser, getSpecificUser, updateUser, logInUser,getAllUsersHoneyHivesReport,getSpecificUserHoneyHivesReport }
