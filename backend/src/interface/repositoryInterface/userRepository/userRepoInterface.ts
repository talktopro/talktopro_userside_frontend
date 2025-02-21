import { Document } from "mongoose";
import { IEmailAuthData } from "../../serviceInterface/userInterface/authInterface/authInterface";

export interface IUserRepository {
  createUser(params: IEmailAuthData): Promise<IUserModel | null>;
  getUserOtpDetails(id:string):Promise<IOtpDetails>
  saveUserDetails(id:string,token:string):Promise<IUserModel | null>
}

export interface IUserModel extends Document {
  _id: string;
  uname: string;
  email: string;
  phone: number;
  password?: string;
  otpDetails?: {
    otp: string;
    createdTime: Date;
  };
  refreshToken?:string
}

export interface IOtpDetails extends Document  {
  _id:string,
  otpDetails: {
    otp: string;
    _id: string;
    createdTime: Date;
  }
}
