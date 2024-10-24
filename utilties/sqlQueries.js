'use strict'

export const getAllProjectWithTaskCount =(role) => {
    if(role == 'member') {
        return `SELECT p.id as id, pu.user_id, p.description AS description, p.name AS name, p.targetCompletionDate, pu.user_id, COUNT(t.id) AS taskCount FROM ProjectUsers pu LEFT JOIN Projects p ON pu.project_id = p.id LEFT JOIN Tasks t ON p.id = t.project_id and t.assigned_to = pu.user_id where pu.user_id= :userId GROUP BY p.id, p.name, p.description;`;
    }
    return `SELECT p.id as id, pu.user_id, p.description AS description, p.name AS name, p.targetCompletionDate, pu.user_id,  COUNT(t.id) AS taskCount FROM ProjectUsers pu LEFT JOIN Projects p ON pu.project_id = p.id LEFT JOIN Tasks t ON p.id = t.project_id  where pu.user_id= :userId GROUP BY p.id, p.name, p.description;`;
}

export const getProjectWithTaskMetrics = (role) => {
    if(role == 'member') {
        `SELECT COUNT(DISTINCT pu.project_id) AS total_projects,COUNT(t.id) AS total_tasks FROM ProjectUsers pu LEFT JOIN Projects p ON pu.project_id = p.id LEFT JOIN Tasks t ON p.id = t.project_id and t.assigned_to = pu.user_id where pu.user_id= :userId GROUP BY pu.user_id;`
    }
    return `SELECT  pu.user_id,COUNT(DISTINCT pu.project_id) AS total_projects,COUNT(t.id) AS total_tasks FROM ProjectUsers pu LEFT JOIN Projects p ON pu.project_id = p.id LEFT JOIN Tasks t ON p.id = t.project_id where pu.user_id=:userId GROUP BY pu.user_id;`
}