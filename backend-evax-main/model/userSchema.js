const mongoose = require("mongoose");

/*

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

*/



userSchema=mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   
    email :
    {
        type:String,
        required: true
    },
    role :
    {
        type:String,
        required: false,
        default: "user"
    },
    date: {
        type: String,
        required: false,
    },
    ncin: {
        type: String,
        required: true,
        default: 0
    },
    nmobile :{
        type: String,
        required: true,
        default: 0
    },
    password :{
      type: String,
      required: true,
    },
    active:
    {
      type:Boolean,
      default:false
    },
    vaccine:
    {
      type:String,
      default:"-"
    },
})


module.exports=User=(mongoose.model('usercollection', userSchema));