import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import usersRouter from './app/module/user/users.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/user', usersRouter);
//testing 

// class ApiError extends Error {
//   statusCode: number;

//   constructor(statusCode: number, message: string | undefined, stack = '') {
//     super(message);
//     this.statusCode = statusCode;
//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// Testing route
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   console.log(x)
    
// });

// Global error handler
app.use(globalErrorHandler);
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err instanceof ApiError) {
//     res.status(err.statusCode).json({ message: err.message });
//   } else {
//     res.status(500).json({ error: 'something went wrong' });
//   }
// });

// Using global error handler middleware


export default app;
