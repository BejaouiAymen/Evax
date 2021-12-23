mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

var Schema = new mongoose.Schema ({
   
    name :  {
        type : String
    } 
   
}) ;

module.exports = mongoose.model('ville' , Schema) ;
