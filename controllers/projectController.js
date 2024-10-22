'use strict'

import { ProjectModel, ProjectUserModel, sequelize } from "../services/sequelize.js";
import { ResponseBody } from "../utilties/helper.js";

const ProjectController = {
    create,
    update,
    get,
    getById,
    remove
}

async function create(req, res, next) {
    try {
        const projectData = { ...req.body, created_by: req.user };
        const project = await ProjectModel.create(projectData);
        await ProjectUserModel.create({ project_id: project.id, user_id: req.user });
        const responseBody = new ResponseBody(200, 'Project successfully created', project);
        res.body = responseBody;
        process.nextTick(next);
    } catch (error) {
        next(error); 
    }
}

async function update(req, res, next) {
    try {
        const { body, params } = req;
        const { id } = params;
        const [updated] = await ProjectModel.update(body, {
            where: { id }
        });

        if (updated) {
            const updatedProject = await ProjectModel.findOne({ where: { id } });
            const responseBody = new ResponseBody(200, 'Project successfully updated', updatedProject);
            res.body = responseBody;
        } else {
            const responseBody = new ResponseBody(404, 'Project not found');
            res.body = responseBody;
        }
        process.nextTick(next);
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next) {
    try {
        const { pageNo = 1, pageSize = 10 } = req.query;
        const response = await ProjectModel.findAll({
            where: {
                created_by: req.user
            },
            order: [['createdAt', 'DESC']],
            limit: Number(pageSize),
            offset: (Number(pageNo) - 1) * Number(pageSize)
        });

        const responseBody = new ResponseBody(200, 'Projects fetched successfully', response);
        res.body = responseBody;
        process.nextTick(next);
    } catch (error) {
        next(error); 
    }
}

async function getById(req, res, next) {
    try {
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
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
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
    } catch (error) {
        next(error);
    }
}

export default ProjectController;