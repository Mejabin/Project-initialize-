import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  Id: string
  role: string
  password: string
}

const UserSchema = new Schema<IUser>({
  Id: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
})

export default model<IUser>('User', UserSchema)
