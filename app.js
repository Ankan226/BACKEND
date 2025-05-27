import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import collegeRoutes from './routes/collegeroutes.js';
import authRoutes from './routes/authroutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import morgan from 'morgan';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/colleges', collegeRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;