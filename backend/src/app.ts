import express from 'express';
 import usersRoutes from './routes/userRoute';
 import messagesRoutes from './routes/messageRoutes';
 import authRoutes from './routes/authRoutes';
 import chatsRoutes from './routes/chatRoutes';

const app = express();
 

app.get('/', (req, res) => {
    res.send('Hello, World!');
}); 

app.use("/api/users", usersRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatsRoutes);

export default app;