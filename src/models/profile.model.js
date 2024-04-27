const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    locations : [{
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        pincode : {
            type : String,
            required : true ,
        }
    }] ,
    wishlist : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Book' ,
    }],
    accountDetails : {
        UPI : {
            type : String ,
            required : true 
        },
        Account_No : {
            type : Number ,
            required : true ,
        }
    }
});

const Profile = mongoose.model('Profile' , profileSchema);

module.exports = Profile ;