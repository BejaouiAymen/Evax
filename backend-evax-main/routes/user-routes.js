const express= require("express") ;
const User = require("../model/userSchema");
const confirmation = require("../model/conifmrationSchema");
const ConfirmationUsers = require("../model/confirmedUsersSchema");
const Centre = require("../model/vaccinationCentreSchema");


const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();
var nodemailer = require('nodemailer');

const middlewares=require("../middleware/user-midlewares");
const { find, findById } = require("../model/userSchema");
const { response } = require("express");


const SECRET_KEY=process.env.SECRET_KEY


var centre_list={
      Tunis:
      {
        id:1,
        centers:{ 
        centre1:{name:"centre1T",idcenter:4},
        centre2:{name:"centre2T",idcenter:5},
        centre3:{name:"centre3T",idcenter:6}
        }
      }
    ,
      benarous:
      {
        id:2,
        centers:{ 
          centre1:{name:"centre1BN",idcenter:1},
          centre2:{name:"centre2BN",idcenter:2},
          centre3:{name:"centre3BN",idcenter:3}  
        }
     }  
}



router.use(express.json())


router.get('/vaccination', function(req, res){
     res.send(centre_list)
});

router.post('/vaccination',middlewares.verifyjwt,middlewares.isUser, function(req, res){
  try{
      const token = req.headers['authorization']
      dcodedToken = jwt.verify(token,process.env.SECRET_KEY);
      userid=dcodedToken.user_id

      var user =  User.findById({_id:userid });
      var {governementId,vaccinationCenterId}=req.body
      

      function addMinutes(date, minutes) {
        return new Date(new Date(date).getTime() + minutes*60000);
    }
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
      var d = new Date();
    Centre.findById({ vaccinationCenterId}, function(err, docs) {
        var date_diff_indays = function(date1, date2) {
            dt1 = new Date(date1);
            dt2 = new Date(date2);
            return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
            }
            var days=date_diff_indays(Date.now(), docs.rendervous);
            if(days<=0){
                var now  = new Date();
                now.setDate(now.getDate() + 1)
                now.setHours(8);
                now.setMinutes(0);
                docs.rendervous=now;
                docs.currentcapacity=docs.capacity;
            }
        docs.currentcapacity=docs.currentcapacity-1;
        if(docs.currentcapacity<=0){
            docs.currentcapacity=docs.capacity;
            //docs.rendervous=addDays(docs.rendervous,1);
            docs.rendervous=addMinutes(docs.rendervous,30);
        }
        if(new Date(docs.rendervous).getHours()>=17){
            docs.rendervous=addMinutes(docs.rendervous,60*15);
        }
        console.log(new Date(docs.rendervous).getHours());
        let DateR=docs.rendervous;
        Centre.findOneAndUpdate({ vaccinationCenterId},
            docs,
            { new: true },
            (err, contact) => {
            if (err) {
              resp.status(400).json(err);
            }
            resp.redirect('/admin/annee');
          });
    })

      const confirmationUsers = ConfirmationUsers.create({
        userid,
        governementId,
        vaccinationCenterId,
        DateR
      
      })
      return  res.send("confirmationUsers done").status(200)

  }
  catch{return res.send("invalid token").status(401)}

  });



router.get('/home', (req, res) => {
  res.send('Hello World!')
})

router.post("/register",async (req,res)=>{
  console.log("tesst")

   try {
   const { first_name, last_name, email, password } = req.body;

   if (!(email && password && first_name && last_name)) {
    res.status(400).send("All input is required");
  }

  const oldUser = await User.findOne({ email });

  console.log(oldUser)

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }
    encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    first_name,
    last_name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  confirmationcoode= randomInteger(0,9999).toString()
  iduser=user._id


  const confirmationuser = await confirmation.create({
    confirmationId:confirmationcoode,
    userid:iduser
  });

  emailSenderFunction(confirmationcoode,user.email)

  const token = jwt.sign(
    { user_id: user._id, email,activation:user.active,role:user.role },
    SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );
  user.token = token;

  res.status(201).json(token);
} catch (err) {
  console.log(err);
}

})

router.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email,activation:user.active,role:user.role },
        SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
try{
      if (!user.active) {
          let userid=user._id
          userConfirmation=confirmation.findOne({userid})

          if(userConfirmation){
          return  res.send({"token":token,message:"confirmation code already sent , please activate your account !"})
            .status(200);  
          }

          else{
            confirmationcoode= randomInteger(0,9999).toString()
            userConfirmation.set({confirmationId:confirmationcoode})
            userConfirmation.save()
            emailSenderFunction(confirmationcoode,user.email)
          res.send("needed confirmation \n please check your email box !","\n token:",token)
          .status(200);
  

          }
        }
      }
      catch{
        return res.send("invalid token").status(401);
      }

      // user
      return  res.status(200).send(token).redirect("/home");
    }

    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

router.post("/account/validation",middlewares.verifyjwt, async (req, res) => {
  const token = req.headers['authorization']
  dcodedToken = jwt.verify(token,process.env.SECRET_KEY);
  userid=dcodedToken.user_id
  var user = await User.findById({_id:userid });
  try{
  if(!user.active){
    try{
      confirmationCode=confirmation.findOne({userid: userid},(err,data)=>{
        console.log("data",data)

        if(data===null){
          let code=randomInteger(1,9999).toString()
          emailSenderFunction(code)

          const confirmationuser = confirmation.create({
            confirmationId:code,
            userid:dcodedToken.user_id
          });
        
          return res.send("expired secret code , please retry again").status(403)
        }

        if(data.confirmationId===req.body.CODE){
          user["active"]=true
          User.updateOne({ _id:userid},user)
          user.save()
          confirmation.deleteOne({userid:userid},(err)=>console.log("error",err))
          return res.send("your account has been activated sccessfully").status(200)
        }
        else  return res.send("bad secret code, please try again !!").status(401)
      
        })
    }
    catch(e) {console.log(e)}
  }
  else{
    return res.redirect("/vaccination")
  }
}
catch{return res.send("invalid token").status(401)}


})

  
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
function isValid(req,resp,next){

}
*/

function emailSenderFunction(message,target){
  const transporter = nodemailer.createTransport({
    port: 465,               
    host: "smtp.gmail.com",
      auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        tls: {
          rejectUnauthorized: false
         }
        ,
    secure: true,
    });


  const mailData = {
    from: 'chikhaouiaalaa1@gmail.com',  
      to: target,   
      subject: 'EVAX CODE',
      text: 'EVAX CODE',
      html:"<h4>Le code expire au bout de 10 minutes. </h4><br><h5> EVAX CODE : "+message+"</h5>"
    };


transporter.sendMail(mailData, function (err, info) {
if(err)
    console.log(err)
else
    console.log(info);
});
}


router.post('/rdv',(req,resp)=>{
  dcodedToken = jwt.verify(req.body.token,process.env.SECRET_KEY);
  user_id=dcodedToken.user_id
  function addMinutes(date, minutes) {
      return new Date(new Date(date).getTime() + minutes*60000);
  }
  function addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    var d = new Date();
console.log(d);
  Centre.findOne({_id:req.body.id_center  }, function(err, docs) {
      var date_diff_indays = function(date1, date2) {
          dt1 = new Date(date1);
          dt2 = new Date(date2);
          return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
          }
          var days=date_diff_indays(Date.now(), docs.rendervous);
          if(days<=0){
              var now  = new Date();
              now.setDate(now.getDate() + 1)
              now.setHours(8);
              now.setMinutes(0);
              docs.rendervous=now;
              docs.currentcapacity=docs.capacity;
          }
      docs.currentcapacity=docs.currentcapacity-30;
      if(docs.currentcapacity<=0){
          docs.currentcapacity=docs.capacity;
          //docs.rendervous=addDays(docs.rendervous,1);
          docs.rendervous=addMinutes(docs.rendervous,30);
      }
      if(new Date(docs.rendervous).getHours()>=17){
          docs.rendervous=addMinutes(docs.rendervous,60*15);
      }
      console.log(new Date(docs.rendervous).getHours());
      User.findOneAndUpdate({_id:user_id},  {'date':docs.rendervous}, {new: true}, function(err, doc) {
        if (!err) {
          console.log("saved");
        }
    });
      Centre.findOneAndUpdate({_id:req.body.id_center },
          docs,
          { new: true },
          (err, contact) => {
          if (err) {
            resp.status(400).json(err);
          }
          return resp.send("rendervous Done").status(200)

        });
  })
 
})




module.exports = router ;