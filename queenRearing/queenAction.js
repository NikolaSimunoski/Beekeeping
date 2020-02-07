var con = require("../database");

getAllQueenNucQuery = (id) => {
    var query = "SELECT * FROM queen_rearing_nucs WHERE Farm_Id =?"
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

getAllQueenNuc = async (req, res) => {
    try {
        var id = req.params.id;
        var data = await getAllQueenNucQuery(id);
        res.status(200).send(data)
    } catch (error) {
        res.send(error);
    }
}


createQueenRearingQuery = (body) => {
    var query = "INSERT INTO queen_rearing_nucs(Queen_Family,Food_Condition,Farm_Id) VALUES (?,?,?)"
    return new Promise((resolve, reject) => {
        con.query(query, [body.Queen_Family, body.Food_Condition,body.Farm_Id], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

createQueenRearing = async (req, res) => {
    try {
        const queen = req.body;
        await createQueenRearingQuery(queen);
        res.status(200).send("NEW QUEEN START")
    } catch (error) {
        res.send(error);
    }
}



updateQueenNucsQuery = (id,kg) => {
    var query = "UPDATE queen_rearing_nucs SET Food_Condition = ? WHERE Id = ?"
    return new Promise((resolve, reject) => {
        con.query(query, [kg,id], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

updateQueenNucs = async (req, res) => {
    try {
        const parId = req.params.id;
        const body = req.body.Food_Condition
        await updateQueenNucsQuery(parId,body);
        res.status(200).send("Updated QueenNuc")
    } catch (error) {
        res.send(error);
    }
}

deleteQueenNucQuery = (nucId) => {
    var query = "DELETE FROM queen_rearing_nucs WHERE Id = ?"
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

deleteQueenNuc = async (req, res) => {
    try {
        const nucToDelete = req.params.id;
        await deleteQueenNucQuery(nucToDelete);
        res.status(200).send("Queen Rearing Nuc is Deleted!");
    } catch (error) {
        res.send(error);
    }
}

module.exports = {createQueenRearing,updateQueenNucs,deleteQueenNuc,getAllQueenNuc}