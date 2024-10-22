'use strict'

import { TaskModel } from "../services/sequelize.js";

const TaskController = {
    create,
    update,
    get,
    getById,
    remove
}

async function create (req,res,next) {
    const response = await TaskModel.create({...req.body, user_id: req.user });
    const responseBody = new ResponseBody(200, 'Task Successful created', response)
    res.body = responseBody
    process.nextTick(next)
}

async function update(req,res,next) {
    const { body, params } = req;
    const { id } = params;
    const response = await TaskModel.update({...body}, {
        where: {id}
    });
    const responseBody = new ResponseBody(200, 'Task Successful updated', response)
    res.body = responseBody
    process.nextTick(next)
}


async function get (req,res,next) {
    const { pageNo = 1, pageSize = 10 } = req.query;
    const condition = req.body
    const response = await TaskModel.findAll({
        where: {
            ...condition
        },
        order: [['createdAt', 'DESC']],
        limit: Number(pageSize),
        offset: (Number(pageNo) - 1) * Number(pageSize)
    });

    const responseBody = new ResponseBody(200, 'Tasks fetched successfully', response);
    res.body = responseBody;
    process.nextTick(next);
}

async function getById (req,res,next) {
    const response = await TaskModel.findOne({ where: {
        id: req.param.id
    }});
    const responseBody = new ResponseBody(200, 'Task fetched Successful', response)
    res.body = responseBody
    process.nextTick(next)
}


async function remove(req,res,next) {
    try {
        const response = await TaskModel.destroy({
            where: {
                id: req.params.id
            }
        });
        if (response) {
            const responseBody = new ResponseBody(200, 'Task deleted successfully');
            res.body = responseBody;
        } else {
            const responseBody = new ResponseBody(404, 'Task not found');
            res.body = responseBody;
        }
        process.nextTick(next);
    } catch (error) {
        next(error);
    }
}

export default TaskController;