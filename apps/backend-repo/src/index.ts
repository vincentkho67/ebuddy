import { onRequest } from 'firebase-functions/v2/https';
import app from './core/app';

export const api = onRequest(app);