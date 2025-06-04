// app.ts
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import meetingRoutes from './routes/meetings';
import memberRoutes from './routes/members'
import userRoutes from './routes/users'
import morgan from 'morgan';
import uploadRoutes from './routes/upload.routes';
import csvRoutes from './routes/csv.routes'



dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use('/auth', authRoutes);
app.use('/meetings', meetingRoutes);
app.use('/members',memberRoutes)
app.use('/users',userRoutes)
app.use('/api', uploadRoutes)
app.use("/csv", csvRoutes);



export default app
