import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(
  cors({
    origin: ['https://spin-cycle24.vercel.app', 'http://localhost:5173'],
    credentials: true,
  }),
);
app.use(cookieParser());

// Application routes
app.use('/api', router);

const testRoute = async (req: Request, res: Response) => {
  res.send('Server in running');
};

app.get('/', testRoute);

app.use(globalErrorHandler);

app.use((req, res, next) => {
  notFound(req, res, next);
});

export default app;
