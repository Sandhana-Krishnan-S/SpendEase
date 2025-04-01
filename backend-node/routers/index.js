const userRouter = require('./userRoute');
const mainRouter = require('express').Router();

mainRouter.use('/auth' , userRouter);

module.exports = mainRouter;