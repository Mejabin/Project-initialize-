import {  AnyZodObjecf } from 'express';
import userService from './../module/user/user.service';


const ValidedRequest:RequestHandler = async (req, res ,next) => {
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

export default  ValidedRequest;
// middleware --> validateRequest(userZodchema) => async(req,res,)



