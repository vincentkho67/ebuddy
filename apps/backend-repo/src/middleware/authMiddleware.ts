import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebaseConfig';
import { logger } from 'firebase-functions';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized - No token provided'
      });
    }

    const token = authHeader.split('Bearer ')[1];
    
    if (process.env.FUNCTIONS_EMULATOR) {
      if (token === 'test-token') {
        return next();
      }
    } else {
      await auth.verifyIdToken(token);
      return next();
    }

    throw new Error('Invalid token');
  } catch (error) {
    logger.error('Auth error:', error);
    return res.status(401).json({
      success: false,
      error: 'Unauthorized - Invalid token'
    });
  }
};