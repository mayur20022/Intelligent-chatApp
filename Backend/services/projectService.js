import mongoose from 'mongoose';
import projectModel from '../models/projectModel.js';

export const createProjectService = async ({ name, userId }) => {
    try {
        if (!name) {
            throw new Error('Name required');
        }
        const project = await projectModel.create({ name, users: [userId] });
        return project;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name already exists');
        }
    }
}

export const allProjectsService = async ({ userId }) => {
    try {
        if (!userId) {
            throw new Error('User ID required');
        }
        const projects = await projectModel.find({ users: userId })
        return projects;
    } catch (error) {
        throw new Error('Error fetching projects');
    }
}

export const addUserToProjectService = async ({ projectId, userId, newUser }) => {
    try {
        if (!projectId || !userId) {
            throw new Error('Project ID and User ID required');
        }
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            throw new Error('Invalid Project ID ');
        }
        if (!Array.isArray(userId) || userId.some(user => !mongoose.Types.ObjectId.isValid(user))) {
            throw new Error('User ID must be an array');
        }
        if (!newUser) {
            throw new Error('New user required');
        }

        if (!mongoose.Types.ObjectId.isValid(newUser)) {
            throw new Error('Invalid user ID ');
        }


        const project = await projectModel.findOne({
            _id: projectId,
            users: [newUser]
        });
        if (!project) {
            throw new Error('User not belong to project');
        }


        const updatedProject = await projectModel.findByIdAndUpdate({
            _id: projectId,
        }, {
            $addToSet: { users: { $each: userId } }
        }, {
            new: true,
        })
        return updatedProject;

    } catch (error) {
        throw new Error('Error adding user to project');
    }
}

export const getProject = async ({ id }) => {
    try {
        if (!id) {
            throw new Error('User ID required');
        }
        const project = await projectModel.findOne({_id: id}).populate('users', 'email name');
        
        return project;
    } catch (error) {
        throw new Error('Error fetching project details');
    }
}