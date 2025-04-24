const { verifyAccess } = require('../middlewares/tokenAuth');
const categoryRoute = require('./categoryRoute');
const userRouter = require('./userRoute');
const mainRouter = require('express').Router();

mainRouter.use('/auth' , userRouter);
mainRouter.use('/category' , verifyAccess , categoryRoute);

module.exports = mainRouter;