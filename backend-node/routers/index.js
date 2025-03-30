const userRouter = require('./userRoute');
const mainRouter = require('express').Router();

mainRouter.use('/user' , userRouter);

module.exports = mainRouter;