const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtkey } = require('../keys');
const router = express.Router();
const User = mongoose.model('User')

router.post('/signup',async (req, res)=>{
   
    const { name, nic, licenseNumber, email, password} = req.body;
    try{
         //the list of data that is to be add to the database
        const user = new User({name, nic, licenseNumber, email, password});
        //saving the Datain the mongoose database
        await user.save();
        const token = jwt.sign({userId: user._id},jwtkey);
        res.send({token});

    }catch(err){
        //Change to the customer error later
        res.status(422).send(err.message)
    }
   
    
})

module.exports = router