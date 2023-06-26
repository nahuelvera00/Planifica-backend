import express from "express"
import { connectDB } from "./config/db"
import dotenv from "dotenv"

// Routes import
import authRoutes from "./routes/auth.routes"
import groupsRoutes from "./routes/group.routes"


dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000


connectDB()
    .then(
        () => {
            app.listen(PORT, () => {
                console.log(`Server running in port: ${PORT}`);
            })
        }
    )
    .catch((error) => {
        console.log("Error connect to Database", error);
    })

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/groups", groupsRoutes)