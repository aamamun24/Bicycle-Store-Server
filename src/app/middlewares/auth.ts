import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import status from 'http-status';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_token_secret as string,
    ) as JwtPayload;

    const { userId, role } = decoded;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      throw new AppError(status.NOT_FOUND, 'This user is not found !');
    }

    if (user?.isBlocked) {
      throw new AppError(status.FORBIDDEN, 'Your account has been blocked !');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        status.FORBIDDEN,
        'You do not have permission to perform this action!',
      );
    }

    req.user = decoded;
    next();
  });
};

export default auth;
