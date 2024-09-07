import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectTODB from './db.js'

//routes
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import queryRoutes from './routes/queryRoutes.js';
import depositRoutes from './routes/depositRoutes.js';
import withdrawRoutes from './routes/withdrawRoutes.js';

dotenv.config();
connectTODB();

const app = express();
  
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/deposit', depositRoutes);
app.use('/api/withdraw', withdrawRoutes);

const port = process.env.PORT || 5174;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})