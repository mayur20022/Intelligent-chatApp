import { Router } from "express"

const router = Router() 
import { body } from "express-validator"
import { createUsercontroller, getAllUser, loginController, logoutUser, profileController } from "../controllers/userController.js"
import { authuser } from "../middleware/authUser.js"


router.post("/register",
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password").isLength({ min: 4 }).withMessage("Password must be at  least 4 characters"),
    createUsercontroller
)

router.post("/login",
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password").isLength({ min: 4 }).withMessage("Password must be at  least 4 characters"),
    loginController
)

router.get("/getall",
    authuser,
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password").isLength({ min: 4 }).withMessage("Password must be at  least 4 characters"),
    getAllUser)
    

router.get("/profile", authuser, profileController)
router.get("/logout", authuser, logoutUser)




export default router