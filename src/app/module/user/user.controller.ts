import { NextFunction, Request, Response } from 'express';
import userService from './user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { User } = req.body;
    const result = await userService.createUser(User);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    // Pass the error to the global error handler
    next(err);
  }
};

export default { createUser};



