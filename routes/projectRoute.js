import Express from 'express'
import { ProjectController } from "../controllers/index.js";
import { asyncWrapper, validate, routeSanity } from "../utilties/index.js";
import { UserSignInValidator, UserSignUpValidator, ProjectValidator } from '../validations/index.js'
import {verifyToken} from "../middlewares/auth.js"

const ProjectRouter = new Express.Router()
const { create, update, get, getById, remove } = ProjectController

ProjectRouter.get('/', UserSignUpValidator, validate, routeSanity,  asyncWrapper(get));
ProjectRouter.get('/:id', UserSignUpValidator, validate, routeSanity,  asyncWrapper(getById));
ProjectRouter.post('/', ProjectValidator, validate, routeSanity,  asyncWrapper(create));
ProjectRouter.patch('/:id', ProjectValidator, validate, routeSanity,  asyncWrapper(update));
ProjectRouter.delete('/:id', UserSignUpValidator, validate, routeSanity, asyncWrapper(remove));

export default ProjectRouter;