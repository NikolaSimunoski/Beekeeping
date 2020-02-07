const express = require("express");
var router = express.Router();
const userRouts = require('./user/routes');
const farmsRoutes = require('./beesFarms/routes');
const queenRoutes = require("./queenRearing/routes");
const nuc = require('./nuc/routes');
const honeyHives = require('./honey_hives/routes');
const partnerKey = require('./partners/routes')
const weather = require('./weather/weatherRoutes')
const totalHoney = require('./total_honey_year/routes')


router.use(userRouts);
router.use(farmsRoutes);
router.use(queenRoutes);
router.use(nuc);
router.use(honeyHives);
router.use(totalHoney)
router.use(partnerKey);
router.use(weather);


module.exports = router 
