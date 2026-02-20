import express from 'express';
import { clerkMiddleware } from '@clerk/express';
import authRoutes from "./routes/authRoutes";
import chatsRoutes from "./routes/chatRoutes";
import messagesRoutes from "./routes/messageRoutes";
import usersRoutes from "./routes/userRoutes";
import { errorHandler } from './middleware/errorHandler';



const app = express();
app.use(express.json());



app.use(clerkMiddleware());



app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is Running!" });
});






app.use("/api/auth", authRoutes);
app.use("/api/chats", chatsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/users", usersRoutes);





app.use(errorHandler);




export default app;

