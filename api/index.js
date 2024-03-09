import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to Mongoose');
  } catch (error) {
    throw error;
  }
};

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
// Middleware for Error Handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.errorMessage || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Disconnected!');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected!');
});

app.listen(8800, () => {
  connect();
  console.log('Connected to backend');
});
