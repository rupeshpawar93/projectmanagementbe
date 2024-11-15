'use strict'

export const getAllProjectWithTaskCount = (role) => {
    if (role == 'member') {
        return `SELECT p.id as id, pu.user_id, p.description AS description, p.name AS name, p.targetCompletionDate, pu.user_id, COUNT(t.id) AS taskCount FROM ProjectUsers pu LEFT JOIN Projects p ON pu.project_id = p.id LEFT JOIN Tasks t ON p.id = t.project_id and t.assigned_to = pu.user_id where pu.user_id=:userId GROUP BY p.id, p.name, p.description ORDER BY p.updatedAt DESC;`;
    }
    return `SELECT p.id as id, pu.user_id, p.description AS description, p.name AS name, p.targetCompletionDate, pu.user_id,  COUNT(t.id) AS taskCount FROM ProjectUsers pu LEFT JOIN Projects p ON pu.project_id = p.id LEFT JOIN Tasks t ON p.id = t.project_id  where pu.user_id= :userId GROUP BY p.id, p.name, p.description ORDER BY p.updatedAt DESC;`;
}

export const getProjectWithTaskMetrics = (role) => {
    if (role == 'member') {
        `SELECT COUNT(DISTINCT pu.project_id) AS total_projects,COUNT(t.id) AS total_tasks FROM ProjectUsers pu LEFT JOIN Projects p ON pu.project_id = p.id LEFT JOIN Tasks t ON p.id = t.project_id and t.assigned_to = pu.user_id where pu.user_id= :userId GROUP BY pu.user_id;`
    }
    return `SELECT  pu.user_id,COUNT(DISTINCT pu.project_id) AS total_projects,COUNT(t.id) AS total_tasks FROM ProjectUsers pu LEFT JOIN Projects p ON pu.project_id = p.id LEFT JOIN Tasks t ON p.id = t.project_id where pu.user_id=:userId GROUP BY pu.user_id;`
}

export const mertricsQueries = (role) => role === 'admin' ? 
        `SELECT t.project_id, p.name, COUNT(CASE WHEN label = '1' AND priority = '3'  THEN 1 END) AS high_priority_bug_count, COUNT(CASE WHEN label = '1' AND priority = '2' THEN 1 END) AS medium_priority_bug_count, 
        COUNT(CASE WHEN label = '1' AND priority = '1' THEN 1 END) AS low_priority_bug_count, COUNT(CASE WHEN label = '2' AND priority = '3' THEN 1 END) AS high_priority_feature_count,
        COUNT(CASE WHEN label = '2' AND priority = '2' THEN 1 END) AS medium_priority_feature_count, COUNT(CASE WHEN label = '2' AND priority = '1' THEN 1 END) AS low_priority_feature_count,
        COUNT(CASE WHEN label = '3' AND priority = '3' THEN 1 END) AS high_priority_enhancement_count, COUNT(CASE WHEN label = '3' AND priority = '2' THEN 1 END) AS medium_priority_enhancement_count,
        COUNT(CASE WHEN label = '3' AND priority = '1' THEN 1 END) AS low_priority_enhancement_count, COUNT(CASE WHEN status = '1' THEN 1 END) AS not_Started,
        COUNT(CASE WHEN status = '2' THEN 1 END) AS in_Progress, COUNT(CASE WHEN status = '3' THEN 1 END) AS completed
        FROM Tasks as t LEFT JOIN Projects as p ON t.project_id = p.id WHERE p.created_by= :userId GROUP BY t.project_id order by p.createdAt DESC `: 
        `SELECT t.project_id, p.name, COUNT(CASE WHEN label = '1' AND priority = '3'  THEN 1 END) AS high_priority_bug_count, COUNT(CASE WHEN label = '1' AND priority = '2' THEN 1 END) AS medium_priority_bug_count, 
        COUNT(CASE WHEN label = '1' AND priority = '1' THEN 1 END) AS low_priority_bug_count, COUNT(CASE WHEN label = '2' AND priority = '3' THEN 1 END) AS high_priority_feature_count,
        COUNT(CASE WHEN label = '2' AND priority = '2' THEN 1 END) AS medium_priority_feature_count, COUNT(CASE WHEN label = '2' AND priority = '1' THEN 1 END) AS low_priority_feature_count,
        COUNT(CASE WHEN label = '3' AND priority = '3' THEN 1 END) AS high_priority_enhancement_count, COUNT(CASE WHEN label = '3' AND priority = '2' THEN 1 END) AS medium_priority_enhancement_count,
        COUNT(CASE WHEN label = '3' AND priority = '1' THEN 1 END) AS low_priority_enhancement_count, COUNT(CASE WHEN status = '1' THEN 1 END) AS not_Started,
        COUNT(CASE WHEN status = '2' THEN 1 END) AS in_Progress, COUNT(CASE WHEN status = '3' THEN 1 END) AS completed
        FROM Tasks as t LEFT JOIN Projects as p ON t.project_id = p.id WHERE t.assigned_to= :userId GROUP BY t.project_id order by p.createdAt DESC `;
