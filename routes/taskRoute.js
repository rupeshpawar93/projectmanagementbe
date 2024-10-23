import Express from 'express'
import { TaskController } from "../controllers/index.js";
import { asyncWrapper, validate, routeSanity } from "../utilties/index.js";
import { TaskValidator } from '../validations/index.js'
import {verifyToken, roleBasedAccess, taskAccess } from "../middlewares/index.js"

const TaskRouter = new Express.Router()
const { create, update, get, getById, remove } = TaskController

TaskRouter.post('/',roleBasedAccess(['admin', 'member']), TaskValidator, validate, routeSanity,  asyncWrapper(create));
TaskRouter.patch('/:id',roleBasedAccess(['admin', 'member']),taskAccess, TaskValidator, validate, routeSanity, asyncWrapper(update));
TaskRouter.get('/project/:id',roleBasedAccess(['admin', 'member']), validate, routeSanity, asyncWrapper(get));
TaskRouter.get('/:id', roleBasedAccess(['admin', 'member']), validate, routeSanity, asyncWrapper(getById));
TaskRouter.delete('/:id',roleBasedAccess(['admin', 'member']), taskAccess, validate, routeSanity,  asyncWrapper(remove));

export default TaskRouter;