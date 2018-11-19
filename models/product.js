//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productId:{
        type:String
    },
    productName:{
        type:String            
    },
    productType:{
        type:String
    },
    price:{
        type:Number
    },
    brand:{
        type:String
    },
    description:{
        type:String
    },
    color:{
        type:String
    },
    image:{
        type:String
    }
});

module.exports=mongoose.model("product",productSchema);
