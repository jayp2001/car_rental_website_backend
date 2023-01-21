const express = require('express')
const router = express.Router();

const {registerCar,getCarListById,getCarList,addBookingDetails,deleteBookingDetails,deleteCarDetails} = require('../controller/carListController');

router.post('/add',registerCar);
router.get('/get',getCarList);
router.get('/getById',getCarListById);
router.post('/addBookingDetail',addBookingDetails);
router.get('/deleteBookingDetails',deleteBookingDetails);
// router.get('/deleteCarDetail',deleteBookingDetails);
router.get('/deleteCarDetail',deleteCarDetails);



module.exports = router;