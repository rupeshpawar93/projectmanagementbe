'use Strict'

import { UserModel } from "../services/index.js"

async function create(params) {
  const user = await UserModel.create(params);
  return user;
}

async function findOne(params) {
  const task = await UserModel.findOne(params);
  return task;
}

async function getMemberList() {
  const users = await UserModel.findAll({
    attributes: ['id', 'name'],
    where: { role: 'member' }
  });
  const userList = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});
  return userList;
}


export { getMemberList, create, findOne };