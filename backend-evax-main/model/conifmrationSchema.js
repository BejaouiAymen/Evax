const mongoose = require("mongoose");

confirnationSchema=mongoose.Schema({
    confirmationId: {
        type: String,
        required: false,
    },
    userid : {
        type: String,
        required: false
    },
},    {timestamps: true})


confirnationSchema.index({createdAt: 1},{expireAfterSeconds: 600});


module.exports=User=(mongoose.model('confirmationcollection', confirnationSchema));