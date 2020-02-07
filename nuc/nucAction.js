var con = require("../database");
const timestamp = require('time-stamp');

getAllNucQuery = (id) => {
    var query = "SELECT * FROM nucs WHERE Farm_Id =?"
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

getAllNuc = async (req, res) => {
    try {
        var id = req.params.id;
        var data = await getAllNucQuery(id);
        res.status(200).send(data)
    } catch (error) {
        res.send(error);
    }
}


createNucQuery = (x) => {
    var query = "INSERT INTO nucs(Frames,Notes,Treatment,Queen_Family,Food_Condition,Farm_Id) VALUES (?,?,?,?,?,?)"
    return new Promise((resolve, reject) => {
        con.query(query, [x.Frames, x.Notes,x.Treatment,x.Queen_Family, x.Food_Condition,x.Farm_Id], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

createNuc = async (req, res) => {
    try {
        const nuc = req.body;
        await createNucQuery(nuc);
        res.status(200).send("NEW NUC START")
    } catch (error) {
        res.send(error);
    }
}



updateNucQuery = (id,x) => {
    var date = timestamp('YYYY-MM-DD HH:mm:ss');
    var query = "UPDATE nucs SET Frames = ?,Notes = ?,Treatment = ?,Queen_Family = ?,Food_Condition = ?,Start_Date = ? WHERE Id = ?"
    return new Promise((resolve, reject) => {
        con.query(query, [x.Frames, x.Notes,x.Treatment,x.Queen_Family, x.Food_Condition,date,id], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

updateNuc = async (req, res) => {
    try {
        const parId = req.params.id;
        const body = req.body;
        await updateNucQuery(parId,body);
        res.status(200).send("Updated Nuc")
    } catch (error) {
        res.send(error);
    }
}

deleteNucQuery = (nucId) => {
    var query = "DELETE FROM nucs WHERE Id = ?"
    return new Promise((resolve, reject) => {
        con.query(query, [nucId], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

deleteNuc = async (req, res) => {
    try {
        const nucToDelete = req.params.id;
        await deleteNucQuery(nucToDelete);
        res.status(200).send("Nuc is Deleted!");
    } catch (error) {
        res.send(error);
    }
}

module.exports = {getAllNuc,createNuc,updateNuc,deleteNuc}