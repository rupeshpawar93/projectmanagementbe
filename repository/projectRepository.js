'use strict'

import { ProjectModel } from "../services/index.js";


async function findOne(params) {
    const task = await ProjectModel.findOne(params);
    return task;
}

async function findById(id) {
    const project = await ProjectModel.findByPk(id);
    return project;
}

async function getProjectProperty(id, key) {
    const project = await findById(id);
    return project[key];
}

export { getProjectProperty, findOne, findById };