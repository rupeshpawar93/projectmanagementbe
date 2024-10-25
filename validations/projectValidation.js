import { body, query } from 'express-validator';

export const ProjectValidator = [
    body("name").notEmpty().withMessage("Provide Project Name"),
    body("description").notEmpty().withMessage("Provide Project Description"),
    body("targetCompletionDate").isDate().withMessage("Provide Project Completetion Date")
        .custom((value, { req }) => {
            const today = new Date();
            if (today < new Date(value)) {
                return true;
            }
            return Promise.reject('targetCompletionDate should be greater then today');
        })
]
