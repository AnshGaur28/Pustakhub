const express = require('express');
const app = express() ;
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routes/authRouter.js')
const healthRouter = require('./routes/healthRouter.js');
const profileRouter = require('./routes/profileRouter.js');
const apiRouter = require('./routes/apiRouter.js');
const connectDB = require('./config/db.config.js');
const authorize = require('./middleware/authorize.js');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/health' , healthRouter);
app.use('/auth' , authRouter);
app.use('/api'  ,  apiRouter);
app.use('/profile'  , profileRouter);

app.use('/' , (req , res)=>{
    return res.status(200).send("Backend is Working");
});

app.listen(80 , async ()=>{
    await connectDB();
    console.log("Database Connected")
    console.log('Backend port is working');
});