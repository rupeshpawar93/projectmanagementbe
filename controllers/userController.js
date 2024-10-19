'use strict'

import bcrypt from 'bcrypt';
import { UserModel } from "../models/index.js"
import { ResponseBody } from "../utilties/index.js"
import { generateToken } from "../middlewares/auth.js";

const UserController = {
    signIn,
    signUp
}
  
async function signUp (req, res, next) {
    const data = await UserModel.create(req.body);
    const responseBody = new ResponseBody(200, 'User Successful created', data)
    res.body = responseBody
    process.nextTick(next)

}

async function signIn (req, res, next) {
    const { email, mobileNumber } = req.body;
    if(!username) {
        return res.status(400).json({error: [{status: false, msg: "Please provide username!", path: "username"}]})
    }

    const user = await UserModel.findOne({ where: { username: req.body.username,  active: true } });
        
    if (!user) {
        // Handle user not found
        return res.status(400).json({error: [{status: false, msg: "User not found!", path: "username"}]})
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        // Passwords match, user authenticated
          // Handle user not found
          const error = new Error("Password is wrong!");
          error.statusCode = 400;
          return res.status(400).json({error: [{status: false, msg: "Password is wrong!", path:"password"}]})
    }
    const token = generateToken({ id: user.id });
    const responseBody = new ResponseBody(200, 'User Signin Successful', {token});
    res.body = responseBody
    process.nextTick(next);
}

export default UserController;