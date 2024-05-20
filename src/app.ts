import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import usersRouter from './app/module/user/users.route';

const app: Application = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/user', usersRouter); // Added a missing forward slash at the beginning of the path

class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

//testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  //throw new apiError
  next('Bug!!!!!');
});

// global error handler
app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ error: 'something went wrong' });
  }
});

export default app;
