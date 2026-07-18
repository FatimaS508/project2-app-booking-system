const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    salon_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true
    },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }]
}, { timestamps: true });

const Category= mongoose.model('Category', categorySchema)

module.exports= Category