const { verifyAccess } = require('../middlewares/tokenAuth');
const categoryRoute = require('./categoryRoute');
const transactionRoute = require('./transactionRoute');
const userRouter = require('./userRoute');
const mainRouter = require('express').Router();

mainRouter.use('/auth' , userRouter);
mainRouter.use('/category' , verifyAccess , categoryRoute);
mainRouter.use('/transaction' , verifyAccess , transactionRoute);

module.exports = mainRouter;