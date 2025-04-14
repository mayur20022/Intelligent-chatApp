import projectModel from '../models/projectModel.js';

export const createProjectService = async ({ name, userId }) => {
    try {
        if (!name ) {
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

export const allProjectsService = async ({userId}) => {
    try {
        if (!userId) {
            throw new Error('User ID required');
        }
        const projects = await projectModel.find({ users: [userId] })
        return projects;
    } catch (error) {
        throw new Error('Error fetching projects');
    }
}