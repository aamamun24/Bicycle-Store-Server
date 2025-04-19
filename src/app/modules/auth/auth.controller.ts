import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const data = await AuthServices.createUserIntoDB(req.body);

  const result = {
    _id: data._id,
    name: data.name,
    email: data.email,
  };

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: status.CREATED,
    data: result,
  });
});

const authLogin = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  res.cookie('token', result.token, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: status.OK,
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  authLogin,
};
