import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import errorMiddleware from './middleware/error.middleware';
import authRouter from './route/auth.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({ success: true });
});

app.use(errorMiddleware);

export default app;
