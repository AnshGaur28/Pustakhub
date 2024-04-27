const jwt = require('jsonwebtoken');
const getUser = async (req , res)=>{
    try{
        const token = req.token ;
        const user = jwt.verify(token, 'JWT_SECRET');
        // console.log('user-------' , user);
        return res.status(200).send({message : "User found Successfully" , user : user})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : "Internal Server Error" , error : error.message});
    }
}
module.exports = getUser ;