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

export const comparePassword = async (password:string,hashPassword:string| undefined):Promise<boolean> => {
  try {
    if(!hashPassword){
      throw new Error("Hash Password Missing")
    }
    return await bcrypt.compare(password,hashPassword)
  } catch (error) {
    console.error(error);
    throw error
  }
}