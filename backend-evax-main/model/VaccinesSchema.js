const mongoose = require("mongoose");

vaccinesSchema=mongoose.Schema({
    vaccineName : {
        type: String,
        required: true,
    },
    quantity : {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: false,
    },
    expirationdate: {
        type: String,
        default:"-"
    }
})

module.exports=User=(mongoose.model('vaccinesCollection', vaccinesSchema));