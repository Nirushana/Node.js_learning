const mongoose = require('mongoose');
//making the user schema or field declaration 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    nic:{
        type:String,
        
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    licenseNumber:{
        type:String,
        required:true,
        unique:true,
    }
})

mongoose.model('User', userSchema)