const mongoose= require("mongoose")

const salonSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String
    },
    about:{
        type: String
    },
    phone:{
        type: Number
    },
    salon_URL:{
        type: String
    }
},{timestamps: true})

const Salon= mongoose.model("Salon", salonSchema)

module.exports= Salon