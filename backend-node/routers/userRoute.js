const jwtRefresh = require('../controller/userController/jwtRefreshController');
const resendMailAuthController = require('../controller/userController/resendMailAuthController');
const loginController = require('../controller/userController/userLoginController');
const registerController = require('../controller/userController/UserRegisterController');
const verifyMailController = require('../controller/userController/verifyMailController');
const { verifyAccess } = require('../middlewares/tokenAuth');
const userRouter = require('express').Router();

userRouter.post('/register' , registerController);
userRouter.post('/login' , loginController);
userRouter.post('/refresh' , jwtRefresh);
// TODO: Add rate limiting to this resend route (max 3 times, cooldown 10min)
userRouter.post('/resend-verification-email' ,verifyAccess , resendMailAuthController );
userRouter.get('/confirm-mail' , verifyMailController);

module.exports = userRouter;