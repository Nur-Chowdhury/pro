import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectTODB from './db.js'
import cookieParser from 'cookie-parser';
import path from "path";

//routes
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import queryRoutes from './routes/queryRoutes.js';
import depositRoutes from './routes/depositRoutes.js';
import withdrawRoutes from './routes/withdrawRoutes.js';

dotenv.config();
connectTODB();

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 5174;
 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/deposit', depositRoutes);
app.use('/api/withdraw', withdrawRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})