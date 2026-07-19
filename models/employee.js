const mongoose= require("mongoose")


const availabilitySchema = new mongoose.Schema({
    time:Date,
    isBooked:{
        type: Boolean,
        default: false
    }
})

const employeeSchema= new mongoose.Schema({
    name:{
        type: String
    },
    rate:{
        type: Number,
        min: 1,
        max: 5
    },
    speciality:{
        type: String
    },
    salon_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon"
    },
    availability:[availabilitySchema]
},{timestamps: true})

const Employee= mongoose.model("Employee", employeeSchema)

module.exports= Employee