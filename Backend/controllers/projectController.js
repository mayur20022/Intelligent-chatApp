import userModel from "../models/userModel.js";
import projectsModel from "../models/projectModel.js";
import { allProjectsService, createProjectService } from '../services/projectService.js';
import { validationResult } from "express-validator";


export const createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const { name } = req.body;
        const logedInUser = await userModel.findOne({ email: req.user.email });
        const userId = logedInUser._id;
        const project =await createProjectService({ name, userId });
        res.status(201).json(project);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

export const allProjects = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    } 
    try {
        const loggedIn = await userModel.findOne({ email: req.user.email });
        
        const projects = await allProjectsService(  {userId: loggedIn._id });
        if (!projects) {
            return res.status(404).json({ message: "No projects found" });
        }

        res.status(200).json(projects);        

    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
        
    }
}