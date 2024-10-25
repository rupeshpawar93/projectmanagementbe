'use strict'

import { Sequelize } from 'sequelize';
import { ProjectModel, ProjectUserModel, TaskModel, UserModel, sequelize } from "../services/sequelize.js";
import { ResponseBody, SQLQueries } from "../utilties/index.js";
import { getMemberList, assignedProjectMembers, updateProjectUsers, findOneProject, findProjectById } from "../repository/index.js";


const ProjectController = {
    create,
    update,
    get,
    getById,
    remove,
    assignedMembers,
    projectMetrics
}

/**
 * create project.
 * @route POST /project
 * @param req - The request body { name, description, targetCompletionDate }.
 * @param res - The response object.
 * @returns Project details.
 */
async function create(req, res, next) {
    const { assignedMember = [] } = req.body;
    const projectData = { ...req.body, created_by: req.user };
    const project = await ProjectModel.create(projectData);
    await updateProjectUsers(project.id, [...assignedMember, req.user]);
    const responseBody = new ResponseBody(200, 'Project successfully created', project);
    res.body = responseBody;
    process.nextTick(next);
}

/**
 * update project.
 * @route PATCH /project/:id
 * @param params - The request param { id }.
 * @param req - The request body { name, description, targetCompletionDate }.
 * @param res - The response object.
 * @returns Project details.
 */
async function update(req, res, next) {
    const { body, params } = req;
    const { assignedMember = [] } = body
    const { id } = params;
    const [updated] = await ProjectModel.update(body, {
        where: { id }
    });
    if (updated) {
        await updateProjectUsers(id, [...assignedMember, req.user]);
        const updatedProject = await findOneProject({ where: { id } });
        const responseBody = new ResponseBody(200, 'Project successfully updated', updatedProject);
        res.body = responseBody;
    } else {
        const responseBody = new ResponseBody(404, 'Project not found');
        res.body = responseBody;
    }
    process.nextTick(next);

}

/**
 * update project.
 * @route GET /project
 * @param res - The response object { project, members }
 * @returns Project details and user with role member.
 */
async function get(req, res, next) {
    const { pageNo = 1, pageSize = 10 } = req.query;
    let members = {};
    const project = await sequelize.query(SQLQueries.getAllProjectWithTaskCount(req.role), {
        replacements: { userId: req.user, limit: Number(pageSize), offset: Number((pageNo - 1) * pageSize) },
        type: sequelize.QueryTypes.SELECT
    });
    if (req.role === 'admin') {
        members = await getMemberList();
    }
    const responseBody = new ResponseBody(200, 'Projects fetched successfully', { project, members });
    res.body = responseBody;
    process.nextTick(next);
}


/**
 * get project by id.
 * @route GET /project/get/:id
 * @param req - The response object { project }
 * @param res - The response object { project }
 * @returns Project details
 */
async function getById(req, res, next) {
    const { id } = req.params;
    const response = await findOneProject({ where: { id } });
    if (response) {
        const responseBody = new ResponseBody(200, 'Project fetched successfully', response);
        res.body = responseBody;
    } else {
        const responseBody = new ResponseBody(404, 'Project not found');
        res.body = responseBody;
    }
    process.nextTick(next);
}

/**
 * delete project.
 * @route DELETE /project/:id
 * @param req - The req params { id }
 * @param res - The response object { project }
 * @returns Project details
 */
async function remove(req, res, next) {
    const project = await findUserById(req.params.id);
    if (!project) {
        throw new Error('Project not found');
    }
    await project.destroy();
    if (project) {
        const responseBody = new ResponseBody(200, 'Project deleted successfully');
        res.body = responseBody;
    } else {
        const responseBody = new ResponseBody(404, 'Project not found');
        res.body = responseBody;
    }
    process.nextTick(next);
}

/**
 * assigned members to project.
 * @route get /project/assigned-members/:id
 * @param req - The req params { id }
 * @param res - The response object { user list }
 * @returns user details
 */
async function assignedMembers(req, res, next) {
    const { id } = req.params;
    const projectMembers = await assignedProjectMembers(id);
    const responseBody = new ResponseBody(200, 'Assigned User to project fetched successfully', { projectMembers });
    res.body = responseBody;
    process.nextTick(next);
}

/**
 * get project metrics.
 * @route get /project/metrics
 * @param res - The response object { metrics }
 * @returns metrics details
 */
async function projectMetrics(req, res, next) {
    const project = await sequelize.query(SQLQueries.mertricsQueries, {
        replacements: { userId: req.user },
        type: sequelize.QueryTypes.SELECT
    });
    const responseBody = new ResponseBody(200, 'Assigned User to project fetched successfully', { metrics: project });
    res.body = responseBody;
    process.nextTick(next);
}

export default ProjectController;