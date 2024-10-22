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
        })
]
