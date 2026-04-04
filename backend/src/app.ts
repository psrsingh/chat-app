import express from 'express';
 import usersRoutes from './routes/userRoute';
 import messagesRoutes from './routes/messageRoutes';
 import authRoutes from './routes/authRoutes';
 import chatsRoutes from './routes/chatRoutes';
import { clerkMiddleware } from '@clerk/express';


const app = express();


//Middleware that integrates Clerk authentication into your Express application. It checks the request's cookies and headers for a session JWT and, if found, attaches the Auth object to the request object under the auth key. 
app.use(clerkMiddleware());

app.get('/', (req, res) => {
    res.send('Hello, World!');
}); 

app.use("/api/users", usersRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatsRoutes);

export default app;