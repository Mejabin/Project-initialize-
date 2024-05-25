import mongoose from "mongoose";
import { IGenericErrorMessage } from "./../interfaces/error";

const handleValidationError = (err: mongoose.Error.ValidationError): { statusCode: number, message: string, errorMessage: IGenericErrorMessage[] } => {
    const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
        (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: el.path,
                message: el.message
            };
        }
    );
    const statusCode = 400;
    const message = 'Validation Error';
    return {
        statusCode,
        message,
        errorMessage: errors,
    };
};

export default handleValidationError;
