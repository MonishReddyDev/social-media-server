import express from "express"

const router = express.Router()
import dotenv from 'dotenv';
import { logOutController, loginController, reFetchController, registerController } from "../controllers/authController.js"

// Load environment variables from .env file
dotenv.config();


//Register

router.post("/register", registerController)


///Login

router.post("/login", loginController)


//Logout

router.get("/logout", logOutController)



//Fetch current user
router.get("/reFetch", reFetchController);





export default router