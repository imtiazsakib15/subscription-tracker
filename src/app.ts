import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import errorMiddleware from './middleware/error.middleware';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send({ success: true });
});

app.use(errorMiddleware);

export default app;
