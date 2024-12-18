import Express from 'express'
import { TaskController } from "../controllers/index.js";
import { asyncWrapper, validate, routeSanity } from "../utilties/index.js";
import { TaskValidator } from '../validations/index.js'
import { verifyToken, roleBasedAccess, taskAccess, projectAccess } from "../middlewares/index.js"

const TaskRouter = new Express.Router()
const { create, update, getTaskList, getById, remove } = TaskController

TaskRouter.post('/', roleBasedAccess(['admin', 'member']), taskAccess, TaskValidator, validate, routeSanity, asyncWrapper(create));
TaskRouter.patch('/:id', roleBasedAccess(['admin', 'member']), taskAccess, TaskValidator, validate, routeSanity, asyncWrapper(update));
TaskRouter.get('/project/:id', roleBasedAccess(['admin', 'member']), projectAccess, validate, routeSanity, asyncWrapper(getTaskList));
TaskRouter.get('/:id', roleBasedAccess(['admin', 'member']), taskAccess, validate, routeSanity, asyncWrapper(getById));
TaskRouter.delete('/:id', roleBasedAccess(['admin', 'member']), taskAccess, taskAccess, validate, routeSanity, asyncWrapper(remove));

export default TaskRouter;