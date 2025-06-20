const express = require('express');
const cors = require('cors');
const Register = require('./models/Register');
const Login = require('./models/Login');
const Subscribe = require('./models/Subscribe');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;
dotenv.config();
const app = express();
app.use(express.json());

app.use(cors (
    {
        origin: "*"
    }
));

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.post('/registers', async (req,res ) => {
    try{
        const register = await Register.create(req.body);
        res.json (register);

    }
    catch{
        res.status (400).json({message: 'failed to create user'});
        
    }


})

app.post('/logins', async(req,res) => {
   try{
 const login = await Login.create(req.body)
    res.json(login);
   }
   catch{
    res.status(400).json({message: 'failed to login user'});
   }
})

app.post('/sub',async (req,res) => {
    try{
        const subscribe = await Subscribe.create(req.body);
       res.json(subscribe)
    }
    catch{
        res.status(400).json({message: 'failed to subscribe'});
    }
})


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then(() => console.log("connected to database"))
.catch((err) => console.error( "error connecting", err))

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})

 


    