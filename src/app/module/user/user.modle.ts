import { Schema } from 'mongoose'
import { IUser } from './users.interface'

const userSchema = new Schema<IUser>(
  {
    Id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default userSchema
