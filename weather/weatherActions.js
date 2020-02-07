var nodejsWeatherApp = require('nodejs-weather-app');




getCurentWeather = async (req, res, next) => {
    var city = req.body.City
    var x = await nodejsWeatherApp.getWeather(city);
    const obj = {
        City:x.name,
        Temperature_Celsius_degrees: x.main.temp,
        Temp_min_Celsius_degrees: x.main.temp_min,
        Temp_max_Celsius_degrees: x.main.temp_max,
        Pressure: x.main.pressure,
        Humidity: x.main.humidity,
        Wind_Speed_kmH: x.wind.speed
    }
    if (x) {
        res.send(obj);
    } else {
        var error = new Error("Please add corect City Name")
        error.status = 404;
        next(error);
    }
}


module.exports = {getCurentWeather};