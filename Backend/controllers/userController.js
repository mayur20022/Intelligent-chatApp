// import userModel from "../models/userModel.js";
import redisClient from "../services/redisService.js";
import { createUser, loginUser } from "../services/userServie.js";
import { validationResult } from "express-validator";


export const createUsercontroller = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        const user = await createUser(req.body);
        const token = await user.generateJWT();
        console.log(token);
        res.cookie("token", token); 
        delete user._doc.password;
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
};


export const loginController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const user = await loginUser(req.body)

        const token = await user.generateJWT();
        res.cookie("token", token);
        delete user._doc.password;
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).send(errors.message);
    }
}


export const profileController = (req, res) => {
    const user = req.user
    res.status(200).json(user);
}

export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        redisClient.set(token, "logout", "EX", 60 * 60 * 24);
        res.status(200).json({ message: "Logged out successfully" })
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
