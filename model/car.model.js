const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
    car_name : {
        required: true,
        type: String,
        minlength: 3,
    },
    car_image : {
        required: true,
        type: String,
        minlength: 3,
    },
    car_number : {
        type: String,
        unique:true,
        required: true
    },
    car_available_status : {
        type: Boolean,
        default:true,
        required: true
    },
    car_color : {
        type: String,
        required: true
    },
    car_seat_capicity : {
        type: Number,
        required: true
    },
    rent_per_day : {
        type: Number,
        required: true
    },
    car_varient : {
        type: String,
        required: true
    },
    car_engine_detail : {
        type: String,
        required: true
    },
    car_other_information : {
        type: String,
        required: true
    },
    current_booking_detail:{
        name : {
            type: String,
            default:null,
        },
        phone_number : {
            type: Number,
            default:null,
        },
        car_issue_date : {
            type: Date,
            default:null
        },
        car_return_date : {
            type: Date,
            default:null
        },
    }
},
{
    timestamps: true,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;