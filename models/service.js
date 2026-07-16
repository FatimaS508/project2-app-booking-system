const mongoose= require("mongoose")

const serviceSchema= new mongoose.Schema({
    name:{
        type: String
    },
    price:{
        type: Number
    },
    description:{
        type: String
    },
    Duration:{
        type: Number
    },
    salon_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref= "Salon"
    }

},{timestamps: true})

const Service= mongoose.model("Service", serviceSchema)

module.exports= Service
