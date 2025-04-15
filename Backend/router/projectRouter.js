import { Router } from 'express';
const router = Router(); 
import { body } from "express-validator"
import { addUserToProject, allProjects, createProject, projectDetails } from '../controllers/projectController.js';
import { authuser } from '../middleware/authUser.js';



router.post('/create',
    body('name').notEmpty().withMessage('Name is required'),
    authuser,
    createProject);

router.get('/getAll', authuser, allProjects);

router.get('/get-project/:id', authuser, projectDetails);

router.put('/add-user', authuser,
    body('projectId').isString().withMessage('Project Id is required'),
    body('userId').isArray({ min: 1 }).withMessage('User must be an array').custom((user) => user.every(user => typeof user === 'string')).withMessage('User must be an array of strings'),
    addUserToProject)

export default router; 