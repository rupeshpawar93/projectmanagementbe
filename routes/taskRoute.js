import Express from 'express'
import { TaskController } from "../controllers/index.js";
import { asyncWrapper, validate } from "../utilties/index.js";
import { UserSignInValidator, UserSignUpValidator } from '../validations/index.js'
import {verifyToken} from "../middlewares/auth.js"

const TaskRouter = new Express.Router()
const { upsert, get, getById, remove } = TaskController

TaskRouter.put('/', UserSignInValidator, validate,  asyncWrapper(upsert));
TaskRouter.get('/', UserSignUpValidator, validate,  asyncWrapper(get));
TaskRouter.get('/:id', UserSignUpValidator, validate,  asyncWrapper(getById));
TaskRouter.delete('/:id', UserSignUpValidator, validate,  asyncWrapper(remove));

export default TaskRouter;