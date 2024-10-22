import Express from 'express'
import { TaskController } from "../controllers/index.js";
import { asyncWrapper, validate } from "../utilties/index.js";
import { TaskValidator } from '../validations/index.js'
import {verifyToken, roleBasedAccess } from "../middlewares/index.js"

const TaskRouter = new Express.Router()
const { create, update, get, getById, remove } = TaskController

TaskRouter.post('/',roleBasedAccess(['admin', 'member']), TaskValidator, validate,  asyncWrapper(create));
TaskRouter.patch('/:id',roleBasedAccess(['admin', 'member']), TaskValidator, validate,  asyncWrapper(update));
TaskRouter.get('/',roleBasedAccess(['admin', 'member']), validate,  asyncWrapper(get));
TaskRouter.get('/:id', roleBasedAccess(['admin', 'member']), validate,  asyncWrapper(getById));
TaskRouter.delete('/:id',roleBasedAccess(['admin', 'member']), validate,  asyncWrapper(remove));

export default TaskRouter;