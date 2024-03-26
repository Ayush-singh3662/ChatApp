import path from 'path';
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToDatabase from "./config/connectToDatabase.js";
import messageRoutes from "./routes/message.router.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import { app, server} from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Let's Start");
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

server.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server started at port ${PORT}`)
});
