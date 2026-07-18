const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    duration: {
        type: Number
    },
    salon_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
       
    }


}, { timestamps: true })

const Service = mongoose.model("Service", serviceSchema)

module.exports = Service
