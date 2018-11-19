const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

var constants=require("../constants/constants.js");

require('../models/product.js');
var ProductModel=mongoose.model("product");
var product;

console.log("productcontroller");

// to add product (seller only)
router.post('/addproduct',(req,res)=>{
    product=new ProductModel(req.body);
    // to-do if product name doesnot comes fix by aggregation of required fields
    product.save().then(response=>{
        res.json("product added");
    });
});

//to fetch all the products
router.get('/fetchproduct',(req,res)=>{
    console.log("fetch");
    /** to-do check user and map with corresponding collection which contain users recent activity,
     based on that sort aggregate the product and list out. */

    ProductModel.find({},(err,data)=>{
        res.send(data);
    })
});

//to delete one particular product (admin)
router.delete('/deleteproduct',(req,res)=>{
    console.log(req.body.productId);    
    ProductModel.findOneAndDelete({productId:req.body.productId})
    .then(()=>{
        res.send("deleted");
    });
});


module.exports=router;