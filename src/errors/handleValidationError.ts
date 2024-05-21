import mongoose from "mongoose";
import { IGenericErrorMessage } from "./../interfaces/error";

const handleValidationError = (err: mongoose.Error.ValidationError): IGenericErrorMessage[] => {
    return Object.values(err.errors).map((el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: el?.path,
            message: el?.message
        };
    });
};

export default handleValidationError;
