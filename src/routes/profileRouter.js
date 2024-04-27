const profileRouter = require('express').Router();
const {getProfileController , editProfileController, editAddressProfileController, addAddressProfileController, createProfileController} = require('../controllers/profile.controller.js');
profileRouter.get('/:userEmail' , getProfileController);
profileRouter.put('/edit' , editAddressProfileController);
profileRouter.post('/add' , addAddressProfileController);
profileRouter.post('/create' , createProfileController);

module.exports = profileRouter ;

