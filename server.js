import express from "express";
const app = express();
import dotenv from "dotenv";
import morgan from "morgan";
import connectdb from "./config/db.js";
import authroutes from "./routes/authroutes.js"

app.use(morgan("dev"));
app.use(express.json())

app.use("/api/v1/auth", authroutes)

dotenv.config();
connectdb();

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to e-commerce app</h1>`);


})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is listening at: http://localhost:${PORT}`)
})