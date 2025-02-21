import { IUserModel } from "../../../repositoryInterface/userRepository/userRepoInterface";

export interface IEmailService {
  emailAuthService(
    params: IEmailAuthData
  ): Promise<IUserModel | null | undefined>;
  verifyOtpService(params: IVerifyOtp): Promise<IUserData | null>;
}

export interface IEmailAuthData {
  uname: string;
  email: string;
  phone: number;
  pwd?: string;
  password?: string;
  otp?: string;
  confirm_password?: string;
}

export interface IVerifyOtp {
  id: string;
  otp: string;
}

export interface IUserData {
  id: string ;
  uname: string;
  email: string;
  phone: number;
  accessToken: string;
  refreshToken: string;
}
