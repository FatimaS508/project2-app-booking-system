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
        ref: "User",
        required: true
    },
    service_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    },
    salon_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon"
    },
    customerName: {
        type: String
    },

    phone: {
        type: String
    },

    notes: {
        type: String
    },

    isGift: {
        type: Boolean,
        default: false
    }

},{timestamps: true})


const Booking= mongoose.model("Booking", bookingSchema)

module.exports= Booking