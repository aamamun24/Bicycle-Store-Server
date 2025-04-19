import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.createUser,
);

router.post('/login', AuthControllers.authLogin);

export const AuthRoutes = router;
