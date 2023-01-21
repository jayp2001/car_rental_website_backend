let Car = require('../model/car.model');
const asyncHandler = require('express-async-handler');



const registerCar = asyncHandler(async (req, res) => {
    const formData = req.body
    if(formData.current_booking_detail && formData.current_booking_detail.car_issue_date && formData.current_booking_detail.car_return_date){
    formData.current_booking_detail.car_issue_date = new Date(formData.current_booking_detail.car_issue_date);
    formData.current_booking_detail.car_return_date = new Date(formData.current_booking_detail.car_return_date);
    }
    console.log('>>>>',formData["current_booking_detail"])
    const car = await Car.create(formData)

    if (car) {
      res.status(201).json("success")
    } else {
      res.status(400)
      throw new Error('Invalid car data')
    }
  })

const getCarList = asyncHandler(async (req,res) => {
  const carData = await Car.find()
  if (carData) {
    res.status(201).json(carData)
  } else {
    res.status(400)
    throw new Error('no car data found')
  }
}
)

const getCarListById = asyncHandler(async(req,res)=>{
    const id = {_id:req.query._id}
    const car = await Car.findById(id);
    if (car) {
      res.status(201).json(car)
    } else {
      res.status(400)
      throw new Error('no car data found')
    }
})

const addBookingDetails = asyncHandler(async(req,res)=>{
  const {_id,name,car_issue_date,car_return_date,phone_number} = req.body;

  await Car.findById(_id)
  .then(carDetail =>{
    carDetail.car_available_status = false;
    carDetail.current_booking_detail.name = name;
    carDetail.current_booking_detail.phone_number = phone_number;
    carDetail.current_booking_detail.car_issue_date = new Date(car_issue_date);
    carDetail.current_booking_detail.car_return_date = new Date(car_return_date);

    carDetail.save()
      .then(() => res.json('Details Update Successfully'))
      .catch(err => res.status(400).json('Error: '+err));
  })
  .catch(err => res.status(400).json('Error: '+err));

})

const deleteBookingDetails = asyncHandler(async(req,res)=>{
  const id = {_id:req.query._id}
  await Car.findById(id)
  .then(carDetail =>{
    carDetail.car_available_status = true;
    carDetail.current_booking_detail.name = null;
    carDetail.current_booking_detail.phone_number = null;
    carDetail.current_booking_detail.car_issue_date = null;
    carDetail.current_booking_detail.car_return_date = null;

    carDetail.save()
      .then(() => res.json('Details Update Successfully'))
      .catch(err => res.status(400).json('Error: '+err));
  })
  .catch(err => res.status(400).json('Error: '+err));

})

const deleteCarDetails = asyncHandler(async(req,res)=>{
  const id = {_id:req.query._id}
  const car = await Car.deleteOne(id);
    if (car) {
      res.status(201).json("data delete successfully")
    } else {
      res.status(400)
      throw new Error('no car data found')
    }
})

  module.exports = {
    registerCar,getCarList,getCarListById,addBookingDetails,deleteBookingDetails,deleteCarDetails
  }