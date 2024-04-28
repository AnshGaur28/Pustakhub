const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js')
const getUser = async (req , res)=>{
    try{
        const token = req.token ;
        const userData = jwt.verify(token, process.env.JWT_SECRET);
        const userId = userData.userId
        const user = await User.findOne({_id : userId});
        console.log(user);
        return res.status(200).send({message : "User found Successfully" , user : user})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : "Internal Server Error" , error : error.message});
    }
}
module.exports = getUser ;