// import { Request, Response } from "express"; // Assuming you might need these later
import { IUser } from './users.interface'

import config from '../../../config/index'

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const createUser = await User.create(user)

  //auto generate
  if (!createUser) {
    throw new error('Failed to create user:')
  }
  return createUser
}
export default {
  createUser,
}
