const express= require("express") ;
const User = require("../model/userSchema");
const confirmation = require("../model/conifmrationSchema");
const ConfirmationUsers = require("../model/confirmedUsersSchema");
const vaccinesSchema = require("../model/VaccinesSchema");



const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();
var nodemailer = require('nodemailer');

const middlewares=require("../middleware/user-midlewares");


const SECRET_KEY=process.env.SECRET_KEY
router.use(express.json())

//router.use(express.json())




router.get('/vaccination-list',middlewares.isOperator, function(req, res){
    //ConfirmationUsers.find({validated:false},(err,data)=>{
    ConfirmationUsers.find({},(err,data)=> {
        return res.send(data).status(200)
    });
});

router.post('/vaccination-list',middlewares.isOperator, function(req, res){
    try{

    const{userId,vaccineId}=req.body

    console.log("***",userId)
    console.log("***",vaccineId)
    
    ConfirmationUsers.findOne({ userId },(err,data)=>{
        console.log(data)
        data["validated"]=true
        console.log("***",data)

        ConfirmationUsers.updateOne({userid:userId},data)
    });

    const vaccine = vaccinesSchema.findOne({_id:vaccineId},(err,data)=>{
        console.log("***>>>>>>>>>",data)
        User.findOne({ userId },(err,userdata)=>{
            if(userdata.vaccine==='-')
            User.updateOne({"_id":userId},{vaccine:data.vaccineName},(err)=>{
                if(err) console.log(err)
                return res.send({message:user.firstName +"is vaccinated with"+data.vaccineName})
            })
        });
    

    })

    


    return res.status(200).end();
    }
    catch{
        return res.status(401)
    }

});



module.exports = router ;