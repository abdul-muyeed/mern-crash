import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(3000, async () => {
    await connectDB();
  console.error('Server is running on http://localhost:3000');
  
});