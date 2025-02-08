import { Request, Response } from 'express';
import { UserRepository } from '../repository/userCollection';
import { UpdateUserRequest } from '../entities/user';
import { logger } from 'firebase-functions';

export class UserController {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
      const lastDoc = req.query.lastDoc ? JSON.parse(req.query.lastDoc as string) : undefined;

      const { users, lastDoc: newLastDoc } = await this.userRepo.getAllUsers(pageSize, lastDoc);

      return res.json({
        success: true,
        data: users,
        pagination: {
          lastDoc: newLastDoc ? JSON.stringify(newLastDoc) : null
        }
      });
    } catch (error) {
      logger.error('Error in getAllUsers:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

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