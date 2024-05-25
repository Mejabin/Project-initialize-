// import { Schema, model, } from 'mongoose'
import { IUser } from './users.interface'
export type IUser = {
  id: string;
  role: string
  password: string
}
export const User = model<IUser, userModel>('User', userSchema);
