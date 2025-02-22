import { BadRequestError } from "../../errors/badRequestError";
import { IUserRepository } from "../../interface/repositoryInterface/userRepository/userRepoInterface";
import {
  IEmailAuthData,
  IEmailLogin,
  IEmailService,
  IUserData,
  IVerifyOtp,
} from "../../interface/serviceInterface/userInterface/authInterface/authInterface";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
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
  emailLoginService = async (loginData: IEmailLogin): Promise<IUserData> => {
    try {
      const { email, password } = loginData;
      const isUserValid = await this.userRepository.getUserByEmail(email);
      if (!isUserValid) {
        throw new BadRequestError("Invalid Email Address! Enter correct Email");
      }
      const isPasswordValid = await comparePassword(
        password,
        isUserValid?.password
      );
      if (!isPasswordValid) {
        throw new BadRequestError("Invalid password! Enter correct Password");
      }
      const accessToken = await createAccessToken(isUserValid?._id);
      const refreshToken = await createRefreshToken(isUserValid?._id);
      const userDetails = await this.userRepository.saveUserDetails(
        isUserValid?._id,
        refreshToken
      );
      if (!userDetails) {
        throw new Error("Error occured");
      }
      const formattedData = {
        id: userDetails?._id,
        uname: userDetails?.uname,
        email: userDetails?.email,
        phone: userDetails?.phone,
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
