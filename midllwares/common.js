
loger = (req, res, next)=>{
    console.log(`Logged ${req.url}- ${req.method} ---${new Date()}`)
    next();
}


wrongRoute = (req, res, next) =>{
    var error = new Error("WRONG ROUTE");
    error.status = 404;
    next(error);  
}


errorHandler = (error, req, res, next) =>{
   var obj ={
        status:error.status,
        error:{
            message:error.message
        }     
    }
    res.json(obj)
}


module.exports = {
    loger,
    wrongRoute,
    errorHandler
}




