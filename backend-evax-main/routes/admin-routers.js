const express= require("express") ;
const User = require("../model/userSchema");
const confirmation = require("../model/conifmrationSchema");
const ConfirmationUsers = require("../model/confirmedUsersSchema");
const VaccinesSchema = require("../model/VaccinesSchema");
const Centre = require("../model/vaccinationCentreSchema");
const Ville = require("../model/ville");
const Gouvernorat = require("../model/gouvernorat");

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();
var nodemailer = require('nodemailer');
const middlewares=require("../middleware/user-midlewares");
const SECRET_KEY=process.env.SECRET_KEY
router.use(express.json())


router.post('/Vaccines-list',middlewares.isAdmin, function(req, res){
    try{
        var vaccine=req.body
        console.log(vaccine)
        VaccinesSchema.create(vaccine).then(()=>{
            return res.send("vaccine added succefully").status(200)
        })
        
    }
    catch
    {return res.send("vaccine added succefully").status(400)}
})



//creat new centre 
router.post('/new-vaccination-centre', function(req, res){
    try{
        var centre=req.body
        console.log(centre)

        Centre.create(centre).then(()=>{
            return res.status(200).send("centre created succefully")
        })
    }
    catch
    {return res.send("error").status(400)}
})


//update centre
router.post('/Vaccination-centre-updated',middlewares.isAdmin, function(req, res){
    try{
        var centreId=req.body._id
        const {name,gouvernement,manager} = req.body
        console.log(centreId)
        Centre.updateOne({"_id":centreId},{
            name:name,
            gouvernement:gouvernement,
            manager:manager
        },
        res.send("centre updated succefully").status(200)
        ,(err)=>{
            if(err) console.log(err)
            return res.send({message:"error :"+err})
        })    
    }
    catch
    {return res.send("error").status(400)}
})

//delete centre
router.post('/Vaccination-centre-del',middlewares.isAdmin, function(req, res){
    try{
        var centreId=req.body._id
        console.log(centreId)
        Centre.deleteOne({"_id":centreId},
        ()=>{
        console.log(centreId)
            return res.send("centre" + centreId + "deleted succefully")        
        }
        ,   
        (err)=>{
            if(err) console.log(err)
            return res.send({message:"error :"+err})
        })    
    }
    catch
    {return res.send("error").status(400)}
})

//check specific centre
 router.post('/Vaccination-centre-id',middlewares.isAdmin, function(req, res){
  //  try{
        var centreId=req.body._id
        console.log(centreId)
        try{

            Centre.find({_id : centreId},(err,data)=>{
                if(err){
                    return res.send("error").status(404)
                }
                console.log(data)
                return res.send(data).status(200)
                
            })

        }
        catch(err){
            console.log(err)
        }
})


//check all centres
router.get('/Vaccination-centre-list',middlewares.isAdmin, function(req, res){

    
    Centre.find({},(err,data)=> {
        return res.send(data).status(200)
    });
 
});

router.post('/add_ville', function(req, res, next) {

    const ville = new Ville({
        name : req.body.name        
    });
   
    console.log(ville);
    console.log(req.body )
    ville.save(function(err, user) {
        if (err) return res.json(err);
        res.redirect('/notebook/list');
    });
}) ;


router.post('/add_gov', function(req, res, next) {

    const gov = new Gouvernorat({
        name : req.body.name        
    });
   
    console.log(gov);
    gov.save(function(err, user) {
        if (err) return res.json(err);
        res.redirect('/notebook/list');
    });
}) ;


router.get('/all',(req,resp)=>{
    Ville.find({},(err, docs) => {
        console.log(docs);
        if (docs) { 
            Gouvernorat.find({}, function(err, docs2) {
                console.log(docs2);
                if (docs) { 
                    return resp. json({docs,docs2});
                }
            });        
         }
        else {
            resp.render('user/annee',{
                'Annee' : tittle
            });
        }
    }).lean();;
   
})


router.get('/center',(req,resp)=>{
    Centre.find({},(err, docs) => {
        console.log(docs);
                    return resp.json(docs);
         })
       
    })




    router.post('/inscription',async function(req, res, next) {
       
        const user = new User({
            name : req.body.name   ,
            email : req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            date:req.body.date,
            ncin: req.body.ncin,
            nmobile: req.body.ncin        
     
        });
       
        console.log(user);
        user.save(function(err, user) {
            if (err) return res.json(err);
            res.redirect('/inscription');
        });
    }) ;
    

module.exports = router ;