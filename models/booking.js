const mongoose= require("mongoose")

const bookingSchema= new mongoose.Schema({
    date:{
        type: Date
    },
    time:{
        type: String
    },
    employee_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    service_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    },
    salon_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon"
    }

},{timestamps: true})


const Booking= mongoose.model("Booking", bookingSchema)

module.exports= Booking