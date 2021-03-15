const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const {mogoUrl} = require('./keys');


 
require('./models/User');
const requireToken = require('./middleware/requireToken');
const authRouters = require('./routes/authRouters');
app.use(bodyParser.json())
app.use(authRouters);

mongoose.connect(mogoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

mongoose.connection.on('connected', ()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error', (err)=>[
    console.log("this is an error",err)
])


app.get('/',requireToken,(req, res)=>{
    res.send("Your Email is" + req.user.email)
})


app.listen(PORT, ()=>{
    console.log("server is running " + PORT);
})