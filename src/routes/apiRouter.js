const apiRouter = require('express').Router();
const getUser = require('../helper/getUser.js')
const authorize = require('../middleware/authorize.js');
const {homeController , buyController  , buyBookController , sellBookController} = require('../controllers/api.controller.js');
apiRouter.get('/' , authorize , homeController);
apiRouter.get('/buy' , authorize , buyController);
apiRouter.get('/buy/:bookID' , authorize , buyBookController);
apiRouter.post('/sell' , authorize , sellBookController);
apiRouter.get('/getUser' , authorize , getUser)

module.exports = apiRouter ;