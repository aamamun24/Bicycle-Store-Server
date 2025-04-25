import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import status from 'http-status';
import { ILoginUser } from './auth.interface';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import config from '../../config';
import AppError from '../../errors/AppError';

const createUserIntoDB = async (payload: IUser) => {
  const existingEmail = await User.findOne({ email: payload?.email });

  if (existingEmail) {
    throw new AppError(status.CONFLICT, 'Email already exits.');
  }

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, 'User does not exit');
  }

  const passwordMatched = bcrypt.compareSync(payload?.password, user?.password);

  if (!passwordMatched) {
    throw new AppError(status.UNAUTHORIZED, 'Invalid password');
  }

  const blockedUser = user?.isBlocked;
  if (blockedUser) {
    throw new AppError(status.FORBIDDEN, 'User is blocked');
  }

  const jwtPayload = {
    userId: user?._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_token_secret as string, {
    // expiresIn: config.jwt_token_expires_in as string,
    expiresIn: '7d',
  });
  return { token };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
