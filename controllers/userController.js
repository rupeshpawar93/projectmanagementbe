'use strict'

import bcrypt from 'bcrypt';
import { UserModel } from "../services/index.js"
import { ResponseBody } from "../utilties/index.js"
import { generateToken } from "../middlewares/auth.js";
import { createUser, findOneUser } from '../repository/index.js';

const UserController = {
    signIn,
    signUp
}

async function signUp(req, res, next) {
    const data = await createUser(req.body);
    const responseBody = new ResponseBody(200, 'User Successful created', data)
    res.body = responseBody
    process.nextTick(next)
}

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

export default UserController;