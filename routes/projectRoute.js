import Express from 'express'
import { ProjectController } from "../controllers/index.js";
import { asyncWrapper, validate, routeSanity } from "../utilties/index.js";
import { UserSignInValidator, UserSignUpValidator, ProjectValidator } from '../validations/index.js'
import { verifyToken, projectAccess } from "../middlewares/index.js"
import roleBasedAccess from '../middlewares/rbac.js';

const ProjectRouter = new Express.Router()
const { create, update, get, getById, remove } = ProjectController

ProjectRouter.get('/', roleBasedAccess(['admin']), validate, routeSanity,  asyncWrapper(get));
ProjectRouter.get('/:id', roleBasedAccess(['admin']), validate, routeSanity,  asyncWrapper(getById));
ProjectRouter.post('/', roleBasedAccess(['admin']), ProjectValidator, validate, routeSanity,  asyncWrapper(create));
ProjectRouter.patch('/:id', roleBasedAccess(['admin']),projectAccess, ProjectValidator, validate, routeSanity,  asyncWrapper(update));
ProjectRouter.delete('/:id', roleBasedAccess(['admin']),projectAccess, validate, routeSanity, asyncWrapper(remove));

export default ProjectRouter;