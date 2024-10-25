'use strict'

import { TaskModel } from "../services/sequelize.js";
import { ResponseBody, SQLQueries } from "../utilties/index.js";
import { assignedProjectMembers, getProjectProperty, createTask, updateTask, destroyTask, findAllTask, findOneTask } from "../repository/index.js";

const TaskController = {
    create,
    update,
    getTaskList,
    getById,
    remove
}

/**
 * create task.
 * @route POST /task
 * @param req - The request body { title, description, targetCompletionDate, label, status, feature }.
 * @param res - The response object.
 * @returns task details.
 */
async function create(req, res, next) {
    const response = await createTask({ ...req.body, created_by: req.user, assigned_to: (req.role === 'admin') ? req.body.assigned_to : req.user });
    const responseBody = new ResponseBody(200, 'Task Successful created', response)
    res.body = responseBody
    process.nextTick(next)
}

/**
 * update task.
 * @route PATCH /task
 * @param req - The request param { id }.
 * @param req - The request body { title, description, targetCompletionDate, label, status, feature }.
 * @param res - The response object.
 * @returns task details.
 */
async function update(req, res, next) {
    const { body, params } = req;
    const { id } = params;
    const response = await updateTask(id, body);
    const responseBody = new ResponseBody(200, 'Task Successful updated', response)
    res.body = responseBody
    process.nextTick(next)
}

/**
 * get task list.
 * @route GET /task/project/:id
 * @param req - The request params{ id }.
 * @param res - The response object.
 * @returns task list.
 */
async function getTaskList(req, res, next) {
    const { pageNo = 1, pageSize = 10 } = req.query;
    const { id } = req.params;
    const where = {
        project_id: id
    }
    if (req.role === 'member') {
        where['assigned_to'] = req.user;
    }
    const order = [['createdAt', 'DESC'], ['priority', 'DESC']];
    const limit = Number(pageSize);
    const offset = (Number(pageNo) - 1) * Number(pageSize);
    const task = await findAllTask({
        where,
        order,
        limit,
        offset
    });
    const members = await assignedProjectMembers(id);
    const projectTargetDate = await getProjectProperty(id, 'targetCompletionDate');
    const responseBody = new ResponseBody(200, 'Tasks fetched successfully', { task, members, projectTargetDate });
    res.body = responseBody;
    process.nextTick(next);
}

/**
 * get task list.
 * @route GET /task/:id
 * @param req - The request params{ id }.
 * @param res - The response object.
 * @returns task detail.
 */
async function getById(req, res, next) {
    const { id } = req.params;
    const where = {
        where: { id }
    };
    const response = await findOneTask(where);
    const responseBody = new ResponseBody(200, 'Task fetched Successful', response)
    res.body = responseBody
    process.nextTick(next)
}

/**
 * remove task.
 * @route DELETE /task/:id
 * @param req - The request params{ id }.
 * @param res - The response object.
 * @returns task detail.
 */
async function remove(req, res, next) {
    const { id } = req.params;
    const response = await destroyTask(id);
    if (response) {
        const responseBody = new ResponseBody(200, 'Task deleted successfully');
        res.body = responseBody;
    } else {
        const responseBody = new ResponseBody(404, 'Task not found');
        res.body = responseBody;
    }
    process.nextTick(next);
}

export default TaskController;