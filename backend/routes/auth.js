const router = require('express').Router();
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let User = require('../models/user.model');


router.route('/').post((req,res)=>{

    User.findOne({"username": req.body.username}).then(user=>{
        if(user==null){
            res.status(401).json("invalid username or password");
        }
            if( req.body.password == user.password){
                console.log("login successful")
                res.json(user)
            }
            else{
                console.log("invalid password")
                
                res.status(401).json("invalid username or password")
            }
            
        
        
    })
    .catch(err=> res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({username,password});

    newUser.save().then(()=>{
        console.log(res.statusCode)
        res.json('User added')
    }
    ).catch((err)=> res.json('Error: ' + err))
});
module.exports = router;