const { verifyAccess } = require('../middlewares/tokenAuth');
const userRouter = require('./userRoute');
const mainRouter = require('express').Router();

mainRouter.use('/auth' , userRouter);
// mainRouter.use('/transaction' , verifyAccess , transactionRouter);

module.exports = mainRouter;