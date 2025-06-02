// app.ts
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import meetingRoutes from './routes/meetings';
import memberRoutes from './routes/members'
import userRoutes from './routes/users'
import morgan from 'morgan';


dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use('/auth', authRoutes);
app.use('/meetings', meetingRoutes);
app.use('/members',memberRoutes)
app.use('/users',userRoutes)



export default app
