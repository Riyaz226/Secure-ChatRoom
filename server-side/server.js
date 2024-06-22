import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'

import DB from './db.js';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, async () => {
    await DB();  
    console.log(`Node Server started on port ${PORT} using nodemon`);
});
