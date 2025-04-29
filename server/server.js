import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import bookRoutes from './routes/books.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.use('/api/books', bookRoutes); 
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("server is running peacefully");
});
app.listen(PORT, () => {
  console.log('server running in port 5000')
});