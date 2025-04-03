const jwtRefresh = require('../controller/jwtRefreshController');
const loginController = require('../controller/userLoginController');
const registerController = require('../controller/UserRegisterController');
const userRouter = require('express').Router();

userRouter.post('/register' , registerController);
userRouter.post('/login' , loginController);
userRouter.post('/refresh' , jwtRefresh);

module.exports = userRouter;