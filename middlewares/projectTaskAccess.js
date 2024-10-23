'use strict'

import { ProjectModel, TaskModel } from "../services/sequelize.js";


const projectAccess = async(req, res, next)=> {
    const { id } = req.params;
    const project = await ProjectModel.findOne({ where: { id: id} });
    if(!project) {
        return res.status(404).json({  status: false, msg: 'Project not found' });
    }
    if(project.created_by !== req.user) {
        return res.status(403).json({  status: false, msg: 'Permission denied' });
    }
    next();
}

const taskAccess = async(req, res, next)=> {
    const { id } = req.params;
    const task = await TaskModel.findOne({ where: { id: id} });
    if(!task) {
        return res.status(404).json({  status: false, msg: 'Task not found' });
    }
    if(task.created_by !== req.user  && task.assigned_to !== req.user) {
        return res.status(403).json({  status: false, msg: 'Permission denied' });
    }
    next();
}


export { projectAccess, taskAccess };