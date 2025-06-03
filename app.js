import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import dotenv from 'dotenv';
import collegeRoutes from './routes/collegeroutes.js';
import authRoutes from './routes/authroutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import morgan from 'morgan';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

connectDB();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/colleges', collegeRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;