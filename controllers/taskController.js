'use strict'

import { TaskModel } from "../services/sequelize.js";
import { ResponseBody, SQLQueries } from "../utilties/index.js";

const TaskController = {
    create,
    update,
    get,
    getById,
    remove
}

async function create (req,res,next) {
    const response = await TaskModel.create({...req.body, created_by: req.user });
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
    const {id} = req.params;
    const where = {
        project_id: id
    }
    if(req.role === 'member') {
        where['assigned_to'] = req.user;
    }
    const response = await TaskModel.findAll({
        where: {
            ...where
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
}

export default TaskController;