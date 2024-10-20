import express from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwtToken from "jsonwebtoken"
const router = express.Router()
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


//Register

router.post("/register", async (req, res) => {

    try {
        const { password, username, email } = req.body

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        })
        if (existingUser) return res.status(400).json({ message: "User already Exists!" })

        //hashPassword
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hashSync(password, salt)
        const newUser = new User({ ...req.body, password: hashpassword })

        await newUser.save()
        res.status(201).json({ message: "user Registered succesfull", newUser })


    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }



})


///Login

router.post("/login", async (req, res) => {

    try {
        const { username, email } = req.body

        const user = await User.findOne({
            $and: [{ username }, { email }]
        })
        if (!user) return res.status(405).json({ message: "User not Found!" })


        const match = await bcrypt.compare(req.body.password, user.password)

        if (!match) return res.status(401).json({ message: "Invalid credentials! " })


        const { password, ...data } = user._doc
        const token = jwtToken.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })
        res.cookie("token", token).status(200).json(data)


    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }



})


//Logout

router.get("/logout", async (req, res) => {

    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).json("user logged out succesfull ")

    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
})



//Fetch current user
router.get("/reFetch", async (req, res) => {
    try {
        const token = req.cookies.token;

        // Verify the JWT token
        jwtToken.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
            if (err) {
                // If there’s an error, return immediately
                return res.status(401).json({ message: "Invalid token", error: err });
            }

            // If no error, extract the user ID
            const id = data._id; // Ensure 'data' is not undefined

            try {
                // Fetch the user by ID
                const user = await User.findOne({ _id: id });

                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                res.status(200).json(user);
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error fetching user", error });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});





export default router