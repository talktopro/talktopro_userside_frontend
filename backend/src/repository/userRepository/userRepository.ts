import { Model } from "mongoose";
import {
  IEmailAuthData,
  IVerifyOtp,
} from "../../interface/serviceInterface/userInterface/authInterface/authInterface";
import {
  IOtpDetails,
  IUserModel,
  IUserRepository,
} from "../../interface/repositoryInterface/userRepository/userRepoInterface";

export class UserRepository implements IUserRepository {
  constructor(private userModel: Model<IUserModel>) {}
  createUser = async (userInfo: IEmailAuthData): Promise<IUserModel | null> => {
    try {
      console.log("userInfo", userInfo);
      const data = await this.userModel.create({
        ...userInfo,
        otpDetails: { otp: userInfo.otp },
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getUserOtpDetails = async (id: string): Promise<IOtpDetails> => {
    try {
      return await this.userModel.findById({ _id: id }).select("otpDetails");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  saveUserDetails = async (id: string, refreshToken: string):Promise<IUserModel | null> => {
    try {
      return await this.userModel.findByIdAndUpdate(
        { _id: id },
        { $set: { refreshToken: refreshToken } },
        { upsert: true, new: true }
      ).select("_id uname email phone refreshToken");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
