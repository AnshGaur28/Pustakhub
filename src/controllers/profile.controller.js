const Profile = require('../models/profile.model.js')
const jwtDecode = require('jwt-decode');
const User = require('../models/user.model.js')
const createProfileController = async(req , res)=>{
    const {user , locality , city , state , country , account ,  upi , pincode}  = req.body ;
    // console.log(req.body);
    try{
        const userprofile = new Profile({
            user : user.data.user.userId,
            locations : {
                locality : locality ,
                city : city ,
                state : state ,
                pincode : pincode ,
                country : country ,
            },
            accountDetails : {
                UPI : upi ,
                Account_No : account
            }
        });
        await userprofile.save();
        return res.status(200).send({message : "Profile created successfully" , profile : userprofile});
    }
    catch(error){
        console.log(error.message)
        return res.status(500).send({error :  error.message});
    }

};

const getProfileController = async(req , res)=>{
    const email = req.query.userEmail;
    try{
        const user = await User.find({email : email});
        if(!user){
            return res.status(500).send({error: "No such user was found"});
        }
        const profile = await Profile.find({userID : _id});
        return res.status(200).send({message:  "User profile found successfully" , profile});
    }
    catch(error){
        return res.status(500).send(error.message);
    }
};

const addAddressProfileController = async(req ,res)=>{
    const token = req.jwt ;
    try{
        const newAddress = req.body.newAddress ;
        const userInfo = jwtDecode(token , process.env.JWT_SECRET);
        await User.findByIdAndUpdate({email : userInfo.email} , {$push : {locations : newAddress}});
    }
    catch(error){
        return res.status(500).send({error : error.message});
    }
};


const editAddressProfileController = async(req ,res)=>{
    const token = req.jwt ;
    try{
        const newAddress = req.body.newAddress ;
        const addresstoFind = req.body.address ;
        const userInfo = jwtDecode(token , process.env.JWT_SECRET);
        const profile = await Profile.find({email : userInfo.email});
        const addressIndex = profile.locations.findIndex((address)=> {
            return address.city === addresstoFind.city
              && address.state === addresstoFind.state
              && address.country === addresstoFind.country
              && address.locality === addresstoFind.locality;
        });
        profile.locations[addressIndex] = newAddress;
    }
    catch(error){
        return res.status(500).send({error : error.message});
    }
}

module.exports = {getProfileController , addAddressProfileController , createProfileController ,editAddressProfileController};