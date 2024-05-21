import { ErrorRequestHandler } from "express";
import config from '../../config';
import handleValidationError from "./../../errors/handleValidationError"; // Adjusted import
import ApiError from "../../errors/ApiError";

config(); // Load environment variables

type IGenericErrorMessage = {
    path: string;
    message: string;
}

const globalErrorHandler : ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
} else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.messages 
    ? [
      {
        path: '',
        message: error.messages,
      }
    ]
    : [];
}
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env!== 'production' ? error.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
