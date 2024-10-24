'use strict'

import { Sequelize } from 'sequelize';
import { ProjectModel, ProjectUserModel,TaskModel, UserModel, sequelize } from "../services/sequelize.js";
import { ResponseBody, SQLQueries } from "../utilties/index.js";
import { getMemberList , assignedProjectMembers, updateProjectUsers } from "../repository/index.js";


const ProjectController = {
    create,
    update,
    get,
    getById,
    remove,
    assignedMembers
}

async function create(req, res, next) {
    const projectData = { ...req.body, created_by: req.user };
    const project = await ProjectModel.create(projectData);
    await ProjectUserModel.create({ project_id: project.id, user_id: req.user });
    const responseBody = new ResponseBody(200, 'Project successfully created', project);
    res.body = responseBody;
    process.nextTick(next);
}

async function update(req, res, next) {
    const { body, params } = req;
    const { assignedMember = [] } = body
    const { id } = params;
    const [updated] = await ProjectModel.update(body, {
        where: { id }
    });
    if (updated) {
        await updateProjectUsers(id, [...assignedMember, req.user]);
        const updatedProject = await ProjectModel.findOne({ where: { id } });
        const responseBody = new ResponseBody(200, 'Project successfully updated', updatedProject);
        res.body = responseBody;
    } else {
        const responseBody = new ResponseBody(404, 'Project not found');
        res.body = responseBody;
    }
    process.nextTick(next);
   
}

async function get(req, res, next) {
    const { pageNo = 1, pageSize = 10 } = req.query;
    let members = {};
    const project = await sequelize.query(SQLQueries.getAllProjectWithTaskCount(req.role), {
        replacements: { userId: req.user, limit: Number(pageSize), offset: Number((pageNo-1) * pageSize) },
        type: sequelize.QueryTypes.SELECT
    });
    if(req.role === 'admin') {
        members = await getMemberList();
    }
    const responseBody = new ResponseBody(200, 'Projects fetched successfully', { project, members });
    res.body = responseBody;
    process.nextTick(next);
}

async function getById(req, res, next) {
    const response = await ProjectModel.findOne({
        where: {
            id: req.params.id 
        }
    });
    if (response) {
        const responseBody = new ResponseBody(200, 'Project fetched successfully', response);
        res.body = responseBody;
    } else {
        const responseBody = new ResponseBody(404, 'Project not found');
        res.body = responseBody;
    }
    process.nextTick(next);
}

async function remove(req, res, next) {
    const response = await ProjectModel.destroy({
        where: {
            id: req.params.id
        }
    });
    if (response) {
        const responseBody = new ResponseBody(200, 'Project deleted successfully');
        res.body = responseBody;
    } else {
        const responseBody = new ResponseBody(404, 'Project not found');
        res.body = responseBody;
    }
    process.nextTick(next);
}

async function assignedMembers(req, res, next) {
    const { id } = req.params;
    const projectMembers =  await assignedProjectMembers(id);
    const responseBody = new ResponseBody(200, 'Assigned User to project fetched successfully', {projectMembers});
    res.body = responseBody;
    process.nextTick(next);
}

export default ProjectController;