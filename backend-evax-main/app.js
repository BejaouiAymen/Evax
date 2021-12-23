const express= require("express") ;
app=express();
require('./model/BD');

const bodyParser = require("body-parser");

app.use(express.json())
require('dotenv').config()

var cors = require('cors');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));



//app.use(require("./routes/user-routes"))


user_routes=require("./routes/user-routes")
app.use(user_routes)



operator_routes=require("./routes/operator-routes")
app.use(operator_routes)


admin_routes=require("./routes/admin-routers")
app.use(admin_routes)


/*
var nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'chikhaouialaa1@gmail.com',
            pass: 'ala2574C',
         },
    secure: true,
    });


    const mailData = {
        from: 'chikhaouiaalaa1@gmail.com',  // sender address
          to: 'chikhaouialaa8@gmail.com',   // list of receivers
          subject: 'Sending Email using Node.js',
          text: 'That was easy!',
          html: '<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>',
        };

    transporter.sendMail(mailData, function (err, info) {
    if(err)
        console.log(err)
    else
        console.log(info);
    });


*/


//const userModel = require("./model/userSchema");

//user_routes=require("./routes/user-routes")

//app.use(user_routes)

/*
let UM = new userModel({
    name:"Alaa10",
    age:25
}) 

UM.save()

userModel.findOne({name:"Alaa5"})
.then((u=>{
    console.log(u)
}))
/*

const User = require('../model/user');
const Match = require('../model/macth');

app.get('/test', (req, res) => {

    let newMatch = new Match({ gender: 'male'});
    newMatch.save().then(matchData => {
        console.log(matchData);
        let newUser = new User({ match: matchData._id, username: 'abc', password: '123456'});
        newUser.save().then(userData => {
            console.log(userData);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

});

*/



app.listen(process.env.PORT,()=>{
    console.log("this serveur is runing on port",process.env.PORT)
})
