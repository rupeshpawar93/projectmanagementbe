'use strict'

import { TaskModel } from "../services/index.js";

async function create(params) {
    const task = await TaskModel.create(params);
    return task;
}

async function update(id, params) {
    const task = await TaskModel.update(params, {
        where: { id }
    });
    return task;
}

async function destroy(id) {
    const task = await TaskModel.destroy({
        where: {
            id
        }
    });
    return task;
}

async function findAll(params) {
    const task = await TaskModel.findAll(params);
    return task;
}

async function findOne(params) {
    const task = await TaskModel.findOne(params);
    return task;
}
export { create, update, destroy, findAll, findOne };