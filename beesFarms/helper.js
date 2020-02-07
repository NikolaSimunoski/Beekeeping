const database = require('../database');



checkFarmExist = (query,x) => {
    return new Promise((resolve, reject) => {
        database.query(query, (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                var resu = result;
                const found = resu.some(element => element.Owner_Id == x)
                if (found) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }
        })
    })
}


createFarmValidateQuery = (query,data) => {
    return new Promise((resolve, reject) => {
        database.query(query, (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                const found = result.some(element => element.partner_key == data.Owner_Key && element.Id == data.Owner_Id)
                if (found) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }
        })
    })
}

module.exports ={checkFarmExist,createFarmValidateQuery}