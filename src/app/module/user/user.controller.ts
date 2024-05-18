import { Request, Response } from 'express'; 
import userService from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const {User} = req.body 
    const result = await userService.createUser(User);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(400).json({ 
      success: false, 
      message: 'Failed to create user',
    });
  }
};

export default {createUser};