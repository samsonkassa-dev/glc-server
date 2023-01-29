import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDatabase from './db.js';
import { errorHandler, notFound } from './error.js';

import authRoutes from './users/user.route.js';
import accRoute from './acc.js';

dotenv.config();

connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.use((res, req, next) =>{
    console.log("here")
    next()
})

app.use('/', accRoute);
app.use('/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
