'use strict'

export const getAllProjectWithTaskCount = `SELECT Project.id, Project.name, Project.description, Project.targetCompletionDate, COUNT(Tasks.id) AS taskCount FROM Projects AS Project LEFT JOIN Tasks AS Tasks ON Project.id = Tasks.project_id WHERE Project.created_by = :createdBy GROUP BY Project.id ORDER BY Project.createdAt DESC LIMIT :limit OFFSET :offset`;