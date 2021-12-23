const mongoose = require("mongoose");

confirnatedUser=mongoose.Schema({
    userid : {
        type: String,
        required: false,
    },
    governementId : {
        type: Number,
        required: true,
    },
    vaccinationCenterId: {
        type: Number,
        required: true,
    },
    Date: {
        type: String,
        required: false,
    },
    validated: {
        type: Boolean,
        required: false,
        default:false
    }
    /*,
    vaccinatedID: {
        type: Number,
        required: true,
    }
    */
})

module.exports=User=(mongoose.model('confirmeduserscollection', confirnatedUser));