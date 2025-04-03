const { verifyAccess } = require('../middlewares/tokenAuth');
const userRouter = require('./userRoute');
const mainRouter = require('express').Router();

mainRouter.use('/auth' , userRouter);
mainRouter.use("/test" , verifyAccess , (req , res) => {
    res.status(200).json({
        status : true,
        data : req.user,
        error : null
    });
})

module.exports = mainRouter;