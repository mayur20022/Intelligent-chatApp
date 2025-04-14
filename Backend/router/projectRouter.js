import { Router } from 'express';
const router = Router(); 
import { body, validationResult } from "express-validator"
import { allProjects, createProject } from '../controllers/projectController.js';
import { authuser } from '../middleware/authUser.js';



router.post('/create',
    body('name').notEmpty().withMessage('Name is required'),
    authuser,
    createProject);

router.get('/getAll', authuser, allProjects);

export default router; 