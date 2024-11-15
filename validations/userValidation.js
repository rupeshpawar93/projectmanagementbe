import { body, query } from 'express-validator';

export const UserSignInValidator = [
    body("username").notEmpty().withMessage("Provide valid username"),
    body("password").notEmpty().withMessage("Password is required")
]

export const UserSignUpValidator = [
    body("username").notEmpty().withMessage('Username is required'),
    body("name").optional().trim().notEmpty().withMessage('Name is required'),
    body("password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage('Provide valid Email'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            return Promise.reject('Passwords do not match');
        }
        return true;
    })
]