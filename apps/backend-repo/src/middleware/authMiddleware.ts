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

    if (process.env.FUNCTIONS_EMULATOR || process.env.NODE_ENV === 'development') {
      if (token === 'test-token') {
        logger.info('Using test token in emulator/development mode');
        return next();
      }
    }

    await auth.verifyIdToken(token);
    return next();
  } catch (error) {
    logger.error('Auth error:', error);
    return res.status(401).json({
      success: false,
      error: 'Unauthorized - Invalid token'
    });
  }
};