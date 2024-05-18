// import { Request, Response } from "express"; // Assuming you might need these later
//database logic
import { IUser } from './users.interface'

import config from '../../../config/index'
import { User } from './user.modle'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated incremnetal
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const createUser = await User.create(user)

  //auto generate
  if (!createUser) {
    throw new Error('Failed to create user:')
  }
  return createUser
}
export default {
  createUser,
}
