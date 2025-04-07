import userModel from "../models/userModel.js";
import { createUser } from "../services/userServie.js";
import { validationResult } from "express-validator";

export const createUsercontroller = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        const user = await createUser(req.body);
        const token = await user.generateJWT(); // Instance method
        res.cookie("token", token); // Fixed
        res.status(201).json({user, token});
    } catch (error) {
        res.status(400).send(error.message);
    }
};
