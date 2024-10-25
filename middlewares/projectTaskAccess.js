'use strict'

import { ProjectModel, ProjectUserModel, TaskModel } from "../services/sequelize.js";
import { findOneProjectAssignedUser } from "../repository/index.js";


/*** here instead of db query redis cache should be use***/
const projectAccess = async (req, res, next) => {
    const { id } = req.params;
    const project = await ProjectUserModel.findOne({ where: { project_id: id , user_id: req.user } });
    if (!project) {
        return res.status(403).json({ status: false, msg: 'Permission denied' });
    }
    next();
}

const taskAccess = async (req, res, next) => {
    if(req.method === 'POST') {
        const { project_id} = req.body
        const user = await ProjectUserModel.findOne( {where: { project_id: project_id, user_id: req.user }});
        if(!user) {
            return res.status(403).json({ status: false, msg: 'Permission denied' });
        }
    } else {
        const { id} = req.params;
        const task = await TaskModel.findOne({ where: { id: id } });
        if (!task) {
            return res.status(404).json({ status: false, msg: 'Task not found' });
        }
        if (task.created_by !== req.user && task.assigned_to !== req.user) {
            return res.status(403).json({ status: false, msg: 'Permission denied' });
        }
    }
    next();
}


export { projectAccess, taskAccess };