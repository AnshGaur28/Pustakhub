const express = require('express');
const app = express() ;
const cors = require('cors');

const healthRouter = require('./routes/healthRouter.js')
app.use(cors())

app.use('/health' , healthRouter);

app.use('/' , (req , res)=>{
    return res.status(200).send("Backend is Working");
})

app.listen(80 , ()=>{
    console.log('Backend port is working fine');
})