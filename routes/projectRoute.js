import Express from 'express'
import { ProjectController } from "../controllers/index.js";
import { asyncWrapper, validate } from "../utilties/index.js";
import { UserSignInValidator, UserSignUpValidator } from '../validations/index.js'
import {verifyToken} from "../middlewares/auth.js"

const ProjectRouter = new Express.Router()
const { upsert, get, getById, remove } = ProjectController

ProjectRouter.put('/', UserSignInValidator, validate,  asyncWrapper(upsert));
ProjectRouter.get('/', UserSignUpValidator, validate,  asyncWrapper(get));
ProjectRouter.get('/:id', UserSignUpValidator, validate,  asyncWrapper(getById));
ProjectRouter.delete('/:id', UserSignUpValidator, validate,  asyncWrapper(remove));

export default ProjectRouter;