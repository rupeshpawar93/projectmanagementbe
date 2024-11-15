'use strict'

import bcrypt from 'bcrypt';
import { UserModel } from "../services/index.js"
import { ResponseBody } from "../utilties/index.js"
import { generateToken } from "../middlewares/auth.js";
import { createUser, findOneUser , updateUser } from '../repository/index.js';

const UserController = {
    signIn,
    signUp,
    update,
    get
}

/**
 * create user.
 * @route POST /signup
 * @param req - The request body { name, username, password, role }.
 * @param res - The response object.
 * @returns user details.
 */
async function signUp(req, res, next) {
    const data = await createUser(req.body);
    const responseBody = new ResponseBody(200, 'User Successful created', data)
    res.body = responseBody
    process.nextTick(next)
}

/**
 * create signin.
 * @route POST /signin
 * @param req - The request body { username, password }.
 * @param res - The response object.
 * @returns user details with token and role.
 */
async function signIn(req, res, next) {
    const { username, password } = req.body;
    const where = { username: req.body.username, active: true }
    const user = await findOneUser({ where });

    if (!user) {
        return res.status(400).json({ error: [{ status: false, msg: "User not found!", path: "username" }] })
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        const error = new Error("Password is wrong!");
        error.statusCode = 400;
        return res.status(400).json({ error: [{ status: false, msg: "Password is wrong!", path: "password" }] })
    }
    const token = generateToken({ id: user.id, role: user.role });
    const responseBody = new ResponseBody(200, 'User Signin Successful', { token, isAdmin: user.role === 'admin' ? true : false });
    res.body = responseBody
    process.nextTick(next);
}

async function update(req, res, next) {
    const { body, user } = req;
    console.log("-------bofy", body);
    const useDetail = await UserModel.findByPk(user); // Fetch the user by their ID
 
    useDetail.password = body.password; // Set the new password
    await useDetail.save(); 
    const responseBody = new ResponseBody(200, 'User Password Update Successful');
    res.body = responseBody
    process.nextTick(next);
}

async function get(req, res, next) {
    const { user } = req;
    const where = { id: user }
    const userDetail = await findOneUser({ where });
    delete userDetail.password;
    const responseBody = new ResponseBody(200, 'User Fetch Successful', userDetail);
    res.body = responseBody
    process.nextTick(next);
}

export default UserController;