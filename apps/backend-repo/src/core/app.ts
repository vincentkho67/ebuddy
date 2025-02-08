import express from 'express';
import { json } from 'express';
import userRoutes from '../routes/userRoutes';

const app = express();

app.use(json());
app.use('/', userRoutes);

export default app;
