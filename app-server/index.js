import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import config from 'config';
import dotenv from 'dotenv';
import UserRoutes from './routes/users.js';
import AdminRoutes from './routes/admin.js';
import DesignerRoutes from './routes/designer.js';
 
import timeout from "connect-timeout";

const app = express();
app.use(cors());
dotenv.config();
// app.use(timeout("30s"));
app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))
app.use('/user', UserRoutes);
app.use('/admin', AdminRoutes);
app.use('/designer', DesignerRoutes);


const CONNECTION_URL = config.get('mongoURI');
const PORT = process.env.PORT || 8000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Connected Server running on Port:${PORT} `)))
    .catch((error) => console.log(error.message));


mongoose.set('useFindAndModify', false);


