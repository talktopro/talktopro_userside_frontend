import { BadRequestError } from "../../errors/badRequestError";
import { IUserRepository } from "../../interface/repositoryInterface/userRepository/userRepoInterface";
import {
  IEmailAuthData,
  IEmailService,
  IUserData,
  IVerifyOtp,
} from "../../interface/serviceInterface/userInterface/authInterface/authInterface";
import { hashPassword } from "../../utils/bcrypt";
import { createOTP } from "../../utils/generateOtp";
import { createAccessToken, createRefreshToken } from "../../utils/token";

export class EmailAuthService implements IEmailService {
  constructor(private userRepository: IUserRepository) {}
  emailAuthService = async (userAuthInput: IEmailAuthData) => {
    try {
      const { uname, email, phone, pwd } = userAuthInput;
      const otp = createOTP();
      const passwordHash = await hashPassword(pwd!);
      const userData = {
        uname,
        email,
        phone,
        password: passwordHash,
        otp,
      };
      return await this.userRepository.createUser(userData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  verifyOtpService = async (
    verificationData: IVerifyOtp
  ): Promise<IUserData> => {
    try {
      const otpDetails = await this.userRepository.getUserOtpDetails(
        verificationData.id
      );
      console.log("OTP Details in servce", otpDetails);
      if (!otpDetails) {
        throw new BadRequestError("OTP Details Not Found");
      }
      if (otpDetails?.otpDetails?.otp !== verificationData.otp) {
        throw new BadRequestError("OTP Invalid");
      }
      if (
        new Date().getTime() - otpDetails?.otpDetails?.createdTime.getTime() >
        2 * 60 * 1000
      ) {
        throw new BadRequestError("OTP has been Expired");
      }
      const userIdString = otpDetails._id.toString();
      const accessToken = await createAccessToken(userIdString);
      const refreshToken = await createRefreshToken(userIdString);

      const userData = await this.userRepository.saveUserDetails(
        otpDetails?._id,
        refreshToken
      );
      if (!userData) {
        throw new BadRequestError("No User Found");
      }
      const formattedData = {
        id: userData?._id,
        uname: userData?.uname,
        email: userData?.email,
        phone: userData?.phone,
        accessToken,
        refreshToken,
      };
      return formattedData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
