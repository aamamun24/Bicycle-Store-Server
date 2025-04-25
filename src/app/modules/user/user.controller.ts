import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    success: true,
    message: 'Users retrieved successfully',
    statusCode: status.OK,
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await UserService.getSingleUser(userId);
  sendResponse(res, {
    success: true,
    message: 'User retrieved successfully',
    statusCode: status.OK,
    data: user,
  });
});

const deactivateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await UserService.deactivateUser(userId);
  sendResponse(res, {
    success: true,
    message: 'User deactivated successfully',
    statusCode: status.OK,
    data: user,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  deactivateUser,
};
