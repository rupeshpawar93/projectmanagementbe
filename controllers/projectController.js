'use strict'

import { ProjectModel } from "../models/index.js";

const ProjectController = {
    upsert,
    get,
    getById,
    remove
}

async function upsert(req,res,next) {
    const [instances, created] = await ProjectModel.upsert(req.body);
    if(created) {
        const responseBody = new ResponseBody(200, 'Project Successful updated', created)
        res.body = responseBody
        process.nextTick(next)
    }
    const responseBody = new ResponseBody(200, 'Project Successful created', created)
    res.body = responseBody
    process.nextTick(next)
}

async function get(req,res,next) {
    const response = await ProjectModel.find(req.body);
    const responseBody = new ResponseBody(200, 'Project fetched Successful', response)
    res.body = responseBody
    process.nextTick(next)
}

async function getById (req,res,next) {
    const response = await ProjectModel.findOne({ where: {
        id: req.param.id
    }});
    const responseBody = new ResponseBody(200, 'Project fetched Successful', response)
    res.body = responseBody
    process.nextTick(next)
}

async function remove (req,res,next) {
    const response = await ProjectModel.destroy( {where : {
        id: req.param.id,
      }})
   
    const responseBody = new ResponseBody(200, 'Project deleted Successful')
    res.body = responseBody
    process.nextTick(next)
}

export default ProjectController;