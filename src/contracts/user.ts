import { Model, ObjectId } from 'mongoose'

export interface IVerification {
  email: string
  accessToken: string
  expiresIn: Date
  user: ObjectId
}

export interface IResetPassword {
  accessToken: string
  expiresIn: Date
  user: ObjectId
}

export interface IUser {
  id: ObjectId
  email: string
  password: string
  firstName: string
  lastName: string
  bio: string
  takenQuests: ObjectId[]
  completedQuests: ObjectId[]
  points: number
}

export interface IUserMethods {
  comparePassword: (password: string) => boolean
}

export type UserModel = Model<IUser, unknown, IUserMethods>

export type VerificationRequestPayload = Pick<IUser, 'email'>

export type UpdateProfilePayload = Required<Pick<IUser, 'bio'>>

export type UpdateEmailPayload = Pick<IUser, 'email' | 'password'>

export interface UpdatePasswordPayload {
  oldPassword: string
  newPassword: string
}

export interface DeleteProfilePayload {
  password: string
}
