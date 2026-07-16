const mongoose= require("mongoose")

const salonSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String
    },
    phone:{
        type: Number
    },
    salon_URL:{
        type: Image
    }
},{timestamps: true})

const Salon= mongoose.model("Salon", salonSchema)

module.exports= Salon