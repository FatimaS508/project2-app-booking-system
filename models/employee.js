const mongoose= require("mongoose")

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
    }
},{timestamps: true})

const Employee= mongoose.model("Employee", employeeSchema)

module.exports= Employee