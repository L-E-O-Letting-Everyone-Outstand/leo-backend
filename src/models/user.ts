import { Schema, model } from 'mongoose'
import { compareSync } from 'bcrypt'

import { IUser, IUserMethods, UserModel } from '@/contracts/user'

const schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    bio: String,
    completedQuests: [{ type: Schema.Types.ObjectId, ref: 'Quest' }],
    points: { type: Schema.Types.Number, default: 0 }
  },
  { timestamps: true }
)

schema.methods.comparePassword = function (password: string) {
  return compareSync(password, this.password)
}

schema.methods.toJSON = function () {
  const obj = this.toObject()

  delete obj.password

  return obj
}

export const User = model<IUser, UserModel>('User', schema)
