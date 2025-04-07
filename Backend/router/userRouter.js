import { Router } from "express"

const router = Router() 
import { body } from "express-validator"
import { createUsercontroller } from "../controllers/userController.js"


router.post("/register",
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password").isLength({ min: 4 }).withMessage("Password must be at  least 4 characters"),
    createUsercontroller
)


export default router