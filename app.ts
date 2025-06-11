// app.ts
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

// Route Imports
import authRoutes from './routes/auth';
import meetingRoutes from './routes/meetings';
import memberRoutes from './routes/members';
import userRoutes from './routes/users';
import uploadRoutes from './routes/upload.routes';
import csvRoutes from './routes/csv.routes';
import htmlPdfRoutes from './routes/htmlToPdf.routes';
import cleanupRoutes from './routes/cleanupRoutes';

// 🔹 Cron Job Import
import './cron/cleanup.cron';

//  Swagger Imports
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger'; // ✅ Use the JS object, not YAML

// Initialize App & Environment
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);
app.use('/meetings', meetingRoutes);
app.use('/members', memberRoutes);
app.use('/users', userRoutes);
app.use('/api', uploadRoutes);
app.use('/csv', csvRoutes);
app.use('/pdf', htmlPdfRoutes);
app.use('/api/cleanup', cleanupRoutes);

export default app;



// // app.ts
// import express from 'express';
// import dotenv from 'dotenv';
// import authRoutes from './routes/auth';
// import meetingRoutes from './routes/meetings';
// import memberRoutes from './routes/members'
// import userRoutes from './routes/users'
// import morgan from 'morgan';
// import uploadRoutes from './routes/upload.routes';
// import csvRoutes from './routes/csv.routes'
// import htmlPdfRoutes from "./routes/htmlToPdf.routes";
// import './cron/cleanup.cron'
// import cleanupRoutes from "./routes/cleanupRoutes";
// import swaggerUi from 'swagger-ui-express';
// import YAML from 'yamljs';



// dotenv.config();

// const app = express();

// // Swagger Setup
// const swaggerDocument = YAML.load('./swagger/swagger');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use(express.json());
// app.use(morgan("dev"));

// app.use('/auth', authRoutes);
// app.use('/meetings', meetingRoutes);
// app.use('/members',memberRoutes)
// app.use('/users',userRoutes)
// app.use('/api', uploadRoutes)
// app.use("/csv", csvRoutes);
// app.use("/pdf", htmlPdfRoutes);

// app.use("/api/cleanup", cleanupRoutes);

// export default app
