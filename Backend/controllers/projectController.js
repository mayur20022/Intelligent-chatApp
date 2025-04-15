import userModel from "../models/userModel.js";
import { addUserToProjectService, allProjectsService, createProjectService, getProject } from '../services/projectService.js';
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

export const addUserToProject = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const { projectId, userId } = req.body;
        const loggedIn = await userModel.findOne({ email: req.user.email });
        console.log(loggedIn);
        
        const project = await addUserToProjectService({ projectId, userId, newUser: loggedIn._id });
        console.log(project);
        
        res.status(200).json({project : project, message: "User added to project successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

export const projectDetails = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const { id } = req.params;
        // const loggedIn = await userModel.findOne({ email: req.user.email });
        const project = await getProject({id});
        if (!project) {
            return res.status(404).json({ message: "No projects found" });
        }

        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
        
    }
}