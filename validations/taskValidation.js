'use strict'

import {body, query } from 'express-validator';

export const TaskValidator = [
    body("title").notEmpty().withMessage("Provide title for task"),
    body("description").notEmpty().withMessage("Provide task Description"),
    body("targetCompletionDate").isDate().withMessage("Provide task Completetion Date")
        .custom((value, { req }) => {
            const today = new Date();
            if(today<new Date(value)) {
                return true;
            }
            return Promise.reject('targetCompletionDate should be greater then today');
        }),
    body("status").notEmpty().withMessage("Provide task Status").isInt({ min: 1, max: 3 })
    .withMessage('Value must be an integer between 1 and 3'),
    body("label").notEmpty().withMessage("Provide task label").isInt({ min: 1, max: 3 })
    .withMessage('Value must be an integer between 1 and 3'),
    body("priority").notEmpty().withMessage("Provide task Priority").isInt({ min: 1, max: 3 })
    .withMessage('Value must be an integer between 1 and 3')
]
