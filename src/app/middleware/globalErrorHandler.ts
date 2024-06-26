import { ErrorRequestHandler } from "express";
import config from '../../config';
import handleValidationError from "./../../errors/handleValidationError"; // Adjusted import
import ApiError from "../../errors/ApiError";
import { errorLogger } from "../../Shared/logger";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodErrors";

type IGenericErrorMessage = {
    path: string;
    message: string;
}

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (config.env === 'development') {
    console.log('globalErrorHandler', error);
  } else {
    errorLogger.error('globalErrorHandler', error);
  }

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } 

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
