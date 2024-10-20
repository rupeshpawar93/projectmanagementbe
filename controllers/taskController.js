'use strict'

import { TaskModel } from "../services/sequelize.js";

const TaskController = {
    create,
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
    const response = await TaskModel.find(req.body);
    const responseBody = new ResponseBody(200, 'Task fetched Successful', response)
    res.body = responseBody
    process.nextTick(next)
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
    const response = await TaskModel.destroy( {where : {
        id: req.param.id,
      }})
   
    const responseBody = new ResponseBody(200, 'TaskModel deleted Successful', response)
    res.body = responseBody
    process.nextTick(next)
}

export default TaskController;