import { UserProps } from './../types/types';
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<UserProps>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  token: {
    type: String,
    required: true,
    trim: true
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    required: false,
    default: "placeholder.jpg",
    trim: true
  }
})

const User = mongoose.model<UserProps>("User", userSchema)

export default User;