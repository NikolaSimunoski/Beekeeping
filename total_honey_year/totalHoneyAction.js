const database = require('../database');

getTotalHoneyYeldQuery = () => {
    var query = "SELECT*FROM year_yeld_of_honey;"
    return new Promise((resolve, reject) => {
        database.query(query,(error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })

}

getTotalHoneyYeld = async (req, res) => {
    try {
        var data = await getTotalHoneyYeldQuery();
        res.status(200).send(data)
    } catch (error) {
        res.send(error);
    }
}

checkYearHoneyHivesQuery = (data) => {
    var query = "SELECT * FROM year_yeld_of_honey"
    return new Promise((resolve, reject) => {
        database.query(query, [data], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                const found = result.some(element => element.Year == data.Year && element.Farm_Id == data.Farm_Id)
                console.log(found)
                if (found) {
                    resolve(true);
                } else {
                    resolve(false)
                }

            }
        })
    })
}

checkYearHoneyHives = async (req, res) => {
    try {
        var data = req;
        found = await checkYearHoneyHivesQuery(data);
        if (found) {
            await updateYearYeld(data)
        } else {
            await createYearYeldRow(data)
        }
    } catch (error) {
        res.send(error);
    }
}

updateYearYeldQuery = (x) => {
    var query = "UPDATE year_yeld_of_honey SET Honey_Total_kg = Honey_Total_kg + ?  WHERE Farm_Id = ? AND Year = ?"
    return new Promise((resolve, reject) => {
        database.query(query, [x.Honey_Total_kg, x.Farm_Id, x.Year], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

updateYearYeld = async (req, res) => {
    try {
        const userReq = req;
        await updateYearYeldQuery(userReq);
        console.log("Your Year Yeld is updated");
    } catch (error) {
        res.send(error);
    }
}

createYearYeldRowQuery = (z) => {
    var query = "INSERT INTO year_yeld_of_honey SET Year = ?,Honey_Total_kg = ?,Farm_Id = ?"
    return new Promise((resolve, reject) => {
        database.query(query, [z.Year, z.Honey_Total_kg, z.Farm_Id], (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result)
            }
        })
    })
}

createYearYeldRow = async (req, res) => {
    try {
        const dataa = req;
        JSON.stringify(dataa)
        await createYearYeldRowQuery(dataa);
        console.log("NEW honey row ADDED")
    } catch (error) {
        console.log(error);
    }
}


module.exports = { checkYearHoneyHives,getTotalHoneyYeld }