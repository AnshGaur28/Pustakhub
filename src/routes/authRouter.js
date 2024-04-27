const apiRouter = require('express').Router(); 
const {loginController  , registerController } = require('../controllers/auth.controller.js')
apiRouter.post('/register' , registerController) ;
apiRouter.post('/login' ,loginController) ;

module.exports = apiRouter ;