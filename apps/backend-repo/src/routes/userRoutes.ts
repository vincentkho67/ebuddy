import { Router } from 'express';
import { UserController } from '../controller/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

router.get(
  '/users/:userId',
  authMiddleware,
  userController.fetchUserData
);

router.patch(
  '/users/:userId',
  authMiddleware,
  userController.updateUserData
);

export default router;