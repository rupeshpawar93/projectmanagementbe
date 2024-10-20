'use strict'

import { ProjectModel } from "../models/index.js";
import { ResponseBody } from "../utilties/helper.js";

const ProjectController = {
    create,
    update,
    get,
    getById,
    remove
}

async function create(req,res,next) {
    console.log("----------------user_id", req.user);
    const response = await ProjectModel.create({...req.body, user_id:req.user});
    const responseBody = new ResponseBody(200, 'Project Successful created', response)
    res.body = responseBody
    process.nextTick(next)
}

async function update(req,res,next) {
    const { body, param } = req;
    const { id } = param;
    const response = await ProjectModel.update({...body}, {
        where: {id}
    });
    const responseBody = new ResponseBody(200, 'Project Successful updated', response)
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