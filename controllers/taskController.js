'use strict'

import { TaskModel } from "../models/index.js";

const TaskController = {
    upsert,
    get,
    getById,
    remove
}

async function upsert (req,res,next) {
    const [instances, created] = await TaskModel.upsert(req.body);
    if(created) {
        const responseBody = new ResponseBody(200, 'Task Successful updated', created)
        res.body = responseBody
        process.nextTick(next)
    }
    const responseBody = new ResponseBody(200, 'Task Successful created', created)
    res.body = responseBody
    process.nextTick(next)
}

async function get (req,res,next) {
    const response = await TaskModel.find(req.body);
    const responseBody = new ResponseBody(200, 'Task fetched Successful', created)
    res.body = responseBody
    process.nextTick(next)
}

async function getById (req,res,next) {
    const response = await TaskModel.findOne({ where: {
        id: req.param.id
    }});
    const responseBody = new ResponseBody(200, 'Task fetched Successful', created)
    res.body = responseBody
    process.nextTick(next)
}


async function remove(req,res,next) {
    const response = await TaskModel.destroy( {where : {
        id: req.param.id,
      }})
   
    const responseBody = new ResponseBody(200, 'TaskModel deleted Successful')
    res.body = responseBody
    process.nextTick(next)
}

export default TaskController;