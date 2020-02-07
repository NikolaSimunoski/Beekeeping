var con = require("../database")



createFarmQuery = (body) => {
    var query = "INSERT INTO bees_farms(Place,Owner_Key,Owner_Id) VALUES (?,?,?)"
    return new Promise((resolve, reject) => {
        con.query(query, [body.Place,body.Owner_Key,body.Owner_Id], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

createFarm = async (req, res) => {
    try {
        const createFarm = req.body;
        await createFarmQuery(createFarm);
        res.status(200).send("NEW FARM ADDED")
    } catch (error) {
        res.send(error);
    }
}


deleteFarmQuery = (usrId) => {
    var query = "DELETE FROM bees_farms WHERE Farm_Id = ?"
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

deleteFarm = async (req, res) => {
    try {
        const farmToDelete = req.params.id;
        await deleteFarmQuery(farmToDelete);
        res.status(200).send("Farm is Deleted!");
    } catch (error) {
        res.send(error);
    }
}

getAllUserFarmsQuery = (userFarms) => {
    var query = "SELECT * FROM bees_farms WHERE Owner_Id= ?"
    return new Promise((resolve, reject) => {
        con.query(query,[userFarms], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

getAllUserFarms = async (req, res) => {
    try {
        const usr = req.params.id
        var data = await getAllUserFarmsQuery(usr);
        res.status(200).send(data)
    } catch (error) {
        res.send(error);
    }
}

module.exports = {createFarm,deleteFarm,getAllUserFarms}