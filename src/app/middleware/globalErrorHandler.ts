import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import handleValidationError from "./../../errors/handleValidationError"; // Adjusted import

config(); // Load environment variables

type IGenericErrorMessage = {
    path: string;
    message: string;
}

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err.name === 'ValidationError') {
    errorMessages = handleValidationError(err);
    statusCode = 400;
    message = 'Validation Error';
  } else {
    errorMessages = [{ path: '', message: err.message }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
