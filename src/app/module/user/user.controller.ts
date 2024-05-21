import {  RequestHandler } from 'express';
import userService from './user.service';

const createUser :RequestHandler = async (req, res ,next) => {
  try {
    const { User } = req.body;
    const result = await userService.createUser(User);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
   
    next(err);
  }
};

export default { createUser};



