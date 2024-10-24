'use strict'

import { ProjectUserModel, UserModel , ProjectModel } from "../services/index.js";

async function assignedProjectMembers(id) {
    const users = await UserModel.findAll({
        include: [
          {
            model: ProjectModel,
            through: { model: ProjectUserModel }, // Ensure ProjectUserModel is included
            where: { id: id }, // Filter by projectId
          },
        ],
        where: { role: 'member' }, // Filter users by role
        attributes: ['id'], // Only fetch user ids
      });
    return users.map(user => user.id);
}

export { assignedProjectMembers }