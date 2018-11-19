//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    userName    : {
       type: String,
    },
    email       : String,
    password    : String,
    phoneNumber : {
        type : Number
    },
    userRole    : String,
    secretQuestion: String,
    secretAnswer: String   

});
module.exports = mongoose.model("users",UserModelSchema);