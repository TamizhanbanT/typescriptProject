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
import htmlPdfRoutes from "./routes/htmlToPdf.routes";
import './cron/cleanup.cron'
import cleanupRoutes from "./routes/cleanupRoutes";



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
app.use("/pdf", htmlPdfRoutes);

app.use("/api/cleanup", cleanupRoutes);



export default app
