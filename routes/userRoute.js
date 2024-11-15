import Express from 'express'
import { UserController } from "../controllers/index.js";
import { asyncWrapper, validate, routeSanity } from "../utilties/index.js";
import { UserSignInValidator, UserSignUpValidator } from '../validations/index.js'
import { verifyToken } from "../middlewares/auth.js"

const UserRouter = new Express.Router()
const { signUp, signIn, update, get } = UserController

UserRouter.post('/signin', UserSignInValidator, validate, routeSanity, asyncWrapper(signIn));
UserRouter.post('/signup', UserSignUpValidator, validate, routeSanity, asyncWrapper(signUp));
UserRouter.patch('/', routeSanity, asyncWrapper(update));
UserRouter.get('/', routeSanity, asyncWrapper(get));

export default UserRouter;