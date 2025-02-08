import { Request, Response } from 'express';
import { UserRepository } from '../repository/userCollection';
import { UpdateUserRequest } from '../entities/user';
import { logger } from 'firebase-functions';

export class UserController {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  fetchUserData = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const user = await this.userRepo.getUser(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      return res.json({
        success: true,
        data: user
      });
    } catch (error) {
      logger.error('Error in fetchUserData:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  updateUserData = async (req: Request, res: Response) => {
    try {
      const updateRequest: UpdateUserRequest = {
        userId: req.params.userId,
        data: req.body
      };

      const updated = await this.userRepo.updateUser(updateRequest);
      
      return res.json({
        success: true,
        data: updated
      });
    } catch (error) {
      logger.error('Error in updateUserData:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };
}