import Express from 'express'
import { TaskController } from "../controllers/index.js";
import { asyncWrapper, validate } from "../utilties/index.js";
import { UserSignInValidator, UserSignUpValidator } from '../validations/index.js'
import {verifyToken, roleBasedAccess } from "../middlewares/index.js"

const TaskRouter = new Express.Router()
const { create, update, get, getById, remove } = TaskController

TaskRouter.post('/',roleBasedAccess(['admin', 'member']), UserSignInValidator, validate,  asyncWrapper(create));
TaskRouter.patch('/:id',roleBasedAccess(['admin', 'member']), UserSignInValidator, validate,  asyncWrapper(update));
TaskRouter.get('/',roleBasedAccess(['admin', 'member']),UserSignUpValidator, validate,  asyncWrapper(get));
TaskRouter.get('/:id', roleBasedAccess(['admin', 'member']),UserSignUpValidator, validate,  asyncWrapper(getById));
TaskRouter.delete('/:id',roleBasedAccess(['admin', 'member']), UserSignUpValidator, validate,  asyncWrapper(remove));

export default TaskRouter;