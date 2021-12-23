const jwt  = require('jsonwebtoken')
require("dotenv").config();


function verifyjwt(req,res,next){
     
    const token = req.headers['authorization']
    if(!token) return res.status(401).json('Unauthorize user')

   try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded
        console.log("req.user",req.user)
        next()

   }catch(e){
    res.status(400).json('Token not valid')
   }
}
function isLoggedIn (req, res, next) {
     if (req.isAuthenticated()) {
       req.session.isAuthenticated = true;
       res.locals.isAuthenticated = true;
       res.locals.user =req.user; 
       next(); //If you are authenticated, run the next
     } else {
       return res.redirect("/login");
     }
   }

function isUser(req,res,next){
     const token = req.headers['authorization']
    try{
         const decoded = jwt.verify(token,process.env.SECRET_KEY);
         req.user = decoded
         console.log(decoded)
         if(decoded.role!="user") return res.status(401).json('Unauthorize user')
         next()
 
    }catch(e){
     res.status(400).json('Token not valid')
    }
 }

 
function isAdmin(req,res,next){
     const token = req.headers['authorization']
    try{
         const decoded = jwt.verify(token,process.env.SECRET_KEY);
         req.user = decoded
         console.log(decoded)
         if(decoded.role!="admin") return res.status(401).json('Unauthorize user')
         next()
 
    }catch(e){
     res.status(400).json('Token not valid')
    }
 }


 function isOperator(req,res,next){
     const token = req.headers['authorization']
    try{
         const decoded = jwt.verify(token,process.env.SECRET_KEY);
         req.user = decoded
         console.log(decoded)
         if(decoded.role!=("operator"||"admin")) return res.status(401).json('Unauthorize user')
         next()
 
    }catch(e){
     res.status(400).json('Token not valid')
    }
 }
 

module.exports = {"verifyjwt":verifyjwt,
"isUser":isUser,
"isLoggedIn":isLoggedIn,
"isAdmin":isAdmin,
"isOperator":isOperator

}