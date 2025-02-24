import { NextFunction, Request, Response } from "express";
import { IEmailService } from "../../interface/serviceInterface/userInterface/authInterface/authInterface";

export class EmailAuthentication {
  constructor(private emailService: IEmailService) {}
  emailSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("bye");

      const userData = await this.emailService.emailAuthService(req.body);
      res
        .status(201)
        .json({
          message: "User Created",
          otp: userData?.otpDetails?.otp,
          id: userData?._id,
        });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const verifyUser = await this.emailService.verifyOtpService(req.body);
      res.status(201).json({ message: "Login Success", data: verifyUser });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  emailLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("inc")
      const userLogin = await this.emailService.emailLoginService(req.body);
      res.status(201).json({ message: "Login success", data: userLogin });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
