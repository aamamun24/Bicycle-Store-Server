import { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

const router = Router();

// Get all users (admin only)
router.get('/', auth('admin'), UserController.getAllUsers);

// Get a single user by ID (admin only)
router.get('/:userId', auth('admin'), UserController.getSingleUser);

// Deactivate a user (admin only)
router.patch(
  '/:userId/deactivate',
  auth('admin'),
  UserController.deactivateUser,
);

export const UserRoutes = router;
