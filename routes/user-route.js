import Express from 'express'
import { UserController } from "../controllers/index.js";
import { asyncWrapper, validate } from "../utilties/index.js";
import { UserSignInValidator, UserSignUpValidator } from '../validations/index.js'
import {verifyToken} from "../middlewares/auth.js"

const UserRouter = new Express.Router()
const { signUp, signIn, adminSignIn, updateAdmin, update } = UserController

UserRouter.post('/signin', UserSignInValidator, validate,  asyncWrapper(signIn));
UserRouter.post('/signup', UserSignUpValidator, validate,  asyncWrapper(signUp));

export default UserRouter;