import bcrypt from "bcrypt";
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRound = 10;
    return await bcrypt.hash(password, saltRound);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
