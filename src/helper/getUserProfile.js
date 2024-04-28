const jwt = require('jsonwebtoken');
const Profile = require('../models/profile.model.js')
const getUserProfile = async (req, res)=>{
    try {
        const token = req.token ;
        const user = jwt.verify(token, 'JWT_SECRET');
        const profile = await Profile.find({user : user.userId}).populate("user");
        console.log(profile);
        if(!profile){
            return res.status(404).send({message : " No such user was found"});
        }
        return res.status(200).send({message : "Profile found" , profile});
    } catch (error) {
        res.status(500).send({message : error.message});
    }

}

module.exports = getUserProfile ;