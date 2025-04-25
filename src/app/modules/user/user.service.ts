import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';

const getAllUsers = async () => {
  const users = await User.find().select('-password');
  return users;
};

const getSingleUser = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }
  return user;
};

const deactivateUser = async (userId: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true, runValidators: true },
  );
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }
  return user;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  deactivateUser,
};
