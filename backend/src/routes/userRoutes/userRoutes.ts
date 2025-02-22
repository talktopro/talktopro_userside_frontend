import express from "express";
import { requestValidator } from "../../middleware/inputValidator/validator";
import { emailSignup, login, verifyOtp } from "../../schemas/userSchema";
import { EmailAuthService } from "../../services/userService/emailAuthService";
import { UserRepository } from "../../repository/userRepository/userRepository";
import { EmailAuthentication } from "../../controllers/userController/emailAuth";
import { userModel } from "../../repository/dbSchema/userSchema";
const userRoutes = express.Router();

const userRepository = new UserRepository(userModel);
const emailAuthService = new EmailAuthService(userRepository);
const emailAuthController = new EmailAuthentication(emailAuthService);
userRoutes.post( 
  "/auth",
  requestValidator(emailSignup),
  emailAuthController.emailSignup
);
userRoutes.post("/auth/verify-otp",requestValidator(verifyOtp),emailAuthController.verifyOtp)
userRoutes.post('/auth/login',requestValidator(login),emailAuthController.emailLogin)
export { userRoutes };
