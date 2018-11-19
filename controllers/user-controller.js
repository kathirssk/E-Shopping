const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
require("../models/users.js");
var constants=require("../constants/constants.js")
var userModel;
 var UserModel= mongoose.model("users");

 var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config.js');


    console.log("usercontroller");
//Register method

   router.post('/register',(req,res)=>{
        console.log(req.body);
        UserModel.findOne({email:req.body.email},(err,data)=>{
            if(null==data){
                
                    userModel=new UserModel(req.body);
                    //todo  userrole has to be set by either admin or end user (end user doesnt have choice)
                     userModel.userRole="seller";
                    userModel.save().then(response=>{
                    res.json(registerSucess);
                 });                
            }
            else{
                res.json(alreadyAccount)
            }
        });
         
});

// login method
  router.post('/login',(req,res)=>{
    console.log("login");
    UserModel.findOne({email:req.body.email},(err,data)=>{
     if(null!=data){
        if(null!=data.email){
            if(req.body.password == data.password){
                var encryptedPassword = bcrypt.hashSync(data.password,8);
                var token =jwt.sign({id:data.email},config.secret,{
                    expiresIn:2300
                });
                res.send({status:loginSuccess,token:token,userobj:data});
                // res.json(loginSuccess);

            }
            else{
                res.json(passwordIncorrect);
            }
        }
     }
       else{
           res.json(emailIncorrect);
       }
    });     
});

// forgot password
    router.post('/forgotpassword',(req,res)=>{
        UserModel.findOne({email:req.body.email},(err,data)=>{
            if(null!=data){
                if(null!=data.email){
                    console.log(data);  
                        res.json(data);
                    }   
                }
                else{
                    console.log("not correct");
                    res.json(emailIncorrect);
                }
        });
    });

//rest password
    router.put('/resetpassword',(req,res)=>{
        UserModel.findOneAndUpdate({email:req.body.email},req.body,()=>{
            console.log(req.body.email);
            res.json(passwordResetted);
        });
    });
   module.exports = router;
