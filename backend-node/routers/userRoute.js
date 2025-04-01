const registerController = require('../controller/UserRegisterController');
const userRouter = require('express').Router();

userRouter.post('/register' , registerController);

module.exports = userRouter;