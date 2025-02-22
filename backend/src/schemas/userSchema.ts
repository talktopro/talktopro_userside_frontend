import Joi from "joi";

export const emailSignup = Joi.object({
  uname: Joi.string().min(2).max(30).required().messages({
    "string.base": "Username must be a text",
    "string.empty": "Username is required",
    "string.min": "Username must be at least 2 characters long",
    "string.max": "Username must be at most 30 characters long",
    "any.required": "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .min(10)
    .max(10)
    .required()
    .messages({
      "string.pattern.base": "Provide Valid PhoneNumber",
    }),
  pwd: Joi.string().min(6).max(30).messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password must not exceed 128 characters.",
    "any.required": "Password is required.",
  }),
  confirm_pwd: Joi.string().valid(Joi.ref("pwd")).required().messages({
    "any.only": "Passwords must match.",
    "any.required": "Confirm Password is required.",
  }),
});

export const verifyOtp = Joi.object({
  id: Joi.string().required(),
  otp: Joi.string().length(6).required().messages({
    "string.length": "OTP must be exactly 6 characters long",
    "any.required": "OTP is required"
  })
});
