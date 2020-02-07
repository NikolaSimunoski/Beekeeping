const database = require('../database');

userEmailValidation = (email) => {
    console.log("proveren format na mail");
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? true : false;
  
}

checkEmailExist = (emailPara) => {
    console.log(emailPara)
    let query = 'SELECT Email FROM user';
    return new Promise((resolve, reject) => {
        database.query(query, (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                var resu = result;
                const found = resu.some(element => element.Email == emailPara)
                if (found) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }
        })
    })
}

checkIdExist = (query,id,fId) => {
    return new Promise((resolve, reject) => {
        database.query(query, (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                const found = result.some(element => element.Id == id && element.Farm_Id == fId)
                if (found) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }
        })
    })
}

checkFmIdExist = (query,Fid) => {
    return new Promise((resolve, reject) => {
        database.query(query, (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                const found = result.some(element => element.Farm_Id == Fid)
                if (found) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }
        })
    })
}

checkKeyExist = (query,key) => {
    return new Promise((resolve, reject) => {
        database.query(query, (error, result, fields) => {
            if (error) {
                reject(error)
            }
            else {
                const found = result.some(element => element.partner_key == key)
                if (found) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }
        })
    })
}



module.exports = { userEmailValidation, checkEmailExist, checkIdExist,checkKeyExist,checkFmIdExist }