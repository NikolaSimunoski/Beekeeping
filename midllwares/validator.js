const vali = require('../user/helper')
const farm = require('../beesFarms/helper')


validateUser = async (req, res, next) => {
    var bodyContent = req.body;
    console.log(req.body)
    var valiEmail = await vali.userEmailValidation(JSON.stringify(bodyContent.Email))
    if (!valiEmail) {
        var error = new Error("invalid email!!!")
        error.status = 400;
        next(error);
    }
    if (req.body.Password.length < 8) {
        var error = new Error("Password must contain at least 8 characters!!!")
        error.status = 400;
        next(error);
    }
    else {
        var mail = await vali.checkEmailExist(bodyContent.Email)
        if (mail) {
            var error = new Error("Email already exist...!!!")
            error.status = 409;
            next(error);
        } else {
            return next();
        }
    }
}

idExist = async (req, res, next) => {
    let query = 'SELECT Id FROM user';
    var content = req.params.id
    var exist = await vali.checkIdExist(query,content);
    if (exist) {
        return next();
    } else {
        var error = new Error("User with ID " + content + " did not exist...!!!")
        error.status = 404;
        next(error);
    }
}

queenIdExist = async (req, res, next) => {
    var content = req.params.id
    let query = 'SELECT Id FROM queen_rearing_nucs';
    var exist = await vali.checkIdExist(query,content);
    if (exist) {
        return next();
    } else {
        var error = new Error("Queen Nuc with ID " + content + " did not exist...!!!")
        error.status = 404;
        next(error);
    }
}

nucIdExist = async (req, res, next) => {
    var content = req.params.id
    let query = 'SELECT Id FROM nucs';
    var exist = await vali.checkIdExist(query,content);
    if (exist) {
        return next();
    } else {
        var error = new Error("Nuc with ID " + content + " did not exist...!!!")
        error.status = 404;
        next(error);
    }
}

nucFarmIdExist = async (req, res, next) => {
    var content = req.params.id
    let query = 'SELECT Farm_Id FROM nucs';
    var exist = await vali.checkFmIdExist(query,content);
    if (exist) {
        return next();
    } else {
        var error = new Error("Nuc with ID " + content + " did not exist...!!!")
        error.status = 404;
        next(error);
    }
}

queenFarmIdExist = async (req, res, next) => {
    var content = req.params.id
    let query = 'SELECT Farm_Id FROM queen_rearing_nucs';
    var exist = await vali.checkFmIdExist(query,content);
    if (exist) {
        return next();
    } else {
        var error = new Error("QueenRearing Hive with ID " + content + " did not exist...!!!")
        error.status = 404;
        next(error);
    }
}

honeyHiveFarmIdExist = async (req, res, next) => {
    var content = req.params.id
    let query = 'SELECT Farm_Id FROM honey_hives';
    var exist = await vali.checkFmIdExist(query,content);
    if (exist) {
        return next();
    } else {
        var error = new Error("Honey Hive with ID " + content + " did not exist...!!!")
        error.status = 404;
        next(error);
    }
}

honeyHiveIdExist = async (req, res, next) => {
    var content = req.params.id
    var bod = req.body.Farm_Id
    let query = 'SELECT Id,Farm_Id FROM honey_hives';
    var exist = await vali.checkIdExist(query,content,bod);
    if (exist) {
        return next();
    } else {
        var error = new Error("Honey Hives with ID " + content + " did not exist or doesn't belong to Farm with id " + bod + " ...!!!")
        error.status = 404;
        next(error);
    }
}

keyExist = async (req, res, next) => {
    var content = req.body.partner_key;
    let query = 'SELECT partner_key FROM user';
    var exist = await vali.checkKeyExist(query,content);
    if (exist) {
        return next();
    } else {
        var error = new Error("User with KEY " + content + " did not exist...!!!")
        error.status = 404;
        next(error);
    }
}

createFarmValidate = async (req, res, next) => {
    var content = req.body
    console.log(content);
    let query = 'SELECT Id,partner_key FROM user';
    var exist = await farm.createFarmValidateQuery(query,content);
    if (exist) {
        return next();
    } else {
        var error = new Error("Wrong Owner Key or Owner Id...!!!")
        error.status = 404;
        next(error);
    }
}

farmIdExist = async (req, res, next) => {
    var content = req.params.id
    let query = 'SELECT * FROM bees_farms';
    var exist = await farm.checkFarmExist(query,content);
    if (exist) {
        return next();
    } else {
        var error = new Error("Farms for User with ID " + content + " did not exist...!!!")
        error.status = 404;
        next(error);
    }
}


module.exports = { 
    validateUser,
    idExist,
    queenIdExist,
    nucIdExist,
    honeyHiveIdExist,
    keyExist,
    createFarmValidate,
    farmIdExist,
    nucFarmIdExist,
    queenFarmIdExist,
    honeyHiveFarmIdExist
 }