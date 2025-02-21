import { model, Schema } from "mongoose";
import { IUserModel } from "../../interface/repositoryInterface/userRepository/userRepoInterface";

const otpSchema = new Schema({
  otp: {
    type: String,
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new Schema<IUserModel>({
  uname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requried: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    requrired: true,
  },
  otpDetails: otpSchema,
  refreshToken: {
    type: String,
  },
});

export const userModel = model<IUserModel>("user", userSchema);
