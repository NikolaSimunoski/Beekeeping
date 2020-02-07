var con = require("../database");
const timestamp = require('time-stamp');
const checkHoney = require('../total_honey_year/totalHoneyAction');

getAllhoneyHiveQuery = (id) => {
    var query = "SELECT * FROM honey_hives WHERE Farm_Id =?"
    return new Promise((resolve, reject) => {
        con.query(query,[id],(error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

getAllhoneyHive = async (req, res) => {
    try {
        var id = req.params.id;
        var data = await getAllhoneyHiveQuery(id);
        res.status(200).send(data)
    } catch (error) {
        res.send(error);
    }
}


createhoneyHiveQuery = (x) => {
    var query = "INSERT INTO honey_hives(Hives,Notes,Treatment,Queen_Family,Queen_Year,Yelds_Of_Honey,Food_Condition,Farm_Id) VALUES (?,?,?,?,?,?,?,?)"
    return new Promise((resolve, reject) => {
        con.query(query, [x.Hives,x.Notes,x.Treatment,x.Queen_Family,x.Queen_Year,x.Yelds_Of_Honey,x.Food_Condition,x.Farm_Id], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

createhoneyHive = async (req, res) => {
    try {
        const nuc = req.body;
        await createhoneyHiveQuery(nuc);
        res.status(200).send("New Honey Hive start")
    } catch (error) {
        res.send(error);
    }
}



updatehoneyHiveQuery = (id,x) => {
    var date = timestamp('YYYY-MM-DD HH:mm:ss');
    var query = "UPDATE honey_hives SET Hives = ?,Notes = ?,Treatment = ?,Queen_Family = ?,Queen_Year = ?,Yelds_Of_Honey = ?,Food_Condition = ?,Start_Date = ?,Farm_Id = ? WHERE Id=?"
    return new Promise((resolve, reject) => {
        con.query(query, [x.Hives,x.Notes,x.Treatment,x.Queen_Family,x.Queen_Year,x.Yelds_Of_Honey,x.Food_Condition,date,x.Farm_Id,id], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                var dat = x.Start_Date.substring(0,4);
                var year = parseInt(dat);
                var yearHoney = parseInt(x.Yelds_Of_Honey);
                var idd = parseInt(x.Farm_Id);
                sendData = {
                    Year:year,
                    Honey_Total_kg:yearHoney,  
                    Farm_Id:idd
                }
                resolve(sendData)
            }
        })
    })
}

updatehoneyHive = async (req, res) => {
    try {
        const rId = req.params.id;
        const body = req.body;
        var dataToSend = await updatehoneyHiveQuery(rId,body); 
        await checkHoney.checkYearHoneyHives(dataToSend);
        res.status(200).send("Updated Honey Hive")  
    } catch (error) {
        res.send(error);
    }
}

deletehoneyHiveQuery = (hiveId) => {
    var query = "DELETE FROM honey_hives WHERE Id = ?"
    return new Promise((resolve, reject) => {
        con.query(query, [hiveId], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

deletehoneyHive = async (req, res) => {
    try {
        const nucToDelete = req.params.id;
        await deletehoneyHiveQuery(nucToDelete);
        res.status(200).send("Honey Hive is Deleted!");
    } catch (error) {
        res.send(error);
    }
}

module.exports = {getAllhoneyHive,createhoneyHive,updatehoneyHive,deletehoneyHive}