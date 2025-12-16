import express from "express";
import cors from "cors";
import db from './config/db.js';
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import managementRoutes from './routes/managementRoutes.js';
import faqcatRoutes from './routes/faqcatRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import pagesRoutes from './routes/pagesRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import servicecatRoutes from './routes/servicecatRoutes.js';
import serviceroutes from './routes/serviceroutes.js';
import casestudyRoutes from './routes/casestudyRoutes.js';
import newscatRoutes from './routes/newscatRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import subscriberroutes from './routes/subscriberroutes.js';


import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
    res.send('Backend is working!');
});


app.use('/api', userRoutes);
app.use('/api', accountRoutes);
app.use('/api', managementRoutes);
app.use('/api', subscriberroutes);


app.use('/api/admin', adminRoutes);
app.use('/api/admin', faqcatRoutes);
app.use('/api/admin', faqRoutes);
app.use('/api/admin', pagesRoutes);
app.use('/api/admin', contactRoutes);
app.use('/api/admin', servicecatRoutes);
app.use('/api/admin', serviceroutes);
app.use('/api/admin', casestudyRoutes);
app.use('/api/admin', newscatRoutes);
app.use('/api/admin', newsRoutes);


app.use('/uploads', express.static('uploads'));



app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, async () => {
    try {
        const [rows] = await db.query('SELECT 1');
        console.log(`✅ MySQL Connected! Test Result: ${rows[0]['1']}`);
    } catch (err) {
        console.error('❌ MySQL Connection Failed:', err.message);
    }

    console.log(`🚀 Server running on: http://localhost:${PORT}`);
});