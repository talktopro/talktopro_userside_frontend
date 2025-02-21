import crypto from "crypto";
export const createOTP = (length = 6) => {
  try {
    return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
