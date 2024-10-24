'use strict'

import { ProjectUserModel, UserModel , ProjectModel } from "../services/index.js";

async function assignedProjectMembers(id) {
    const users = await UserModel.findAll({
        include: [
          {
            model: ProjectModel,
            through: { model: ProjectUserModel },
            where: { id: id },
          },
        ],
        where: { role: 'member' },
        attributes: ['id','name'],
      });
    return users.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {});
}

 async  function updateProjectUsers(projectId, selectedUserIds) {
      const project = await ProjectModel.findByPk(projectId);
      await project.setUsers(selectedUserIds);
      console.log('Project users updated successfully!');
}
export { assignedProjectMembers, updateProjectUsers }