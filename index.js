import express from "express";
import dbConfig from "./database/dbConfig.js";
import authrouter from "./routes/auth.js"
import cookieParser from "cookie-parser";


const port = 6000
const app = express()

app.use(express.json())
app.use(cookieParser())

dbConfig()


app.use("/api/auth", authrouter)

app.listen(port, () => {
    console.log("app is running on port", port)
})



