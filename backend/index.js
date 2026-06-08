import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import explainRouter from "./routes/explain.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }))
app.use(express.json())

app.use("/api/explain", explainRouter)

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
