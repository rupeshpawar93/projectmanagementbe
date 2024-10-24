'use Strict'

import { UserModel } from "../services/index.js"

async function getMemberList() {
    const users = await UserModel.findAll({
        attributes: ['id', 'name'],
        where: { role: 'member'}
      });
      const userList = users.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {});
      return userList;
}


export { getMemberList };