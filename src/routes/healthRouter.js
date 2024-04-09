const healthRouter = require('express').Router();


healthRouter.get('/' , (req , res)=>{
    return res.status(200).send("API healthy")
})

module.exports = healthRouter