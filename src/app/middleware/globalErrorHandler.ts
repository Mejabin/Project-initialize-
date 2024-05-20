import { Request,Response,NextFunction } from "express";



const globalErrorHandler= app.use((
    err, 
    req: Request,
     res: Response,
      next: NextFunction) => {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ error: 'something went wrong' });