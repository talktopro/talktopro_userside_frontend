import jwt from 'jsonwebtoken'
export const createAccessToken = async(id:string):Promise<string>=>{
    try {
        if(!process.env.JWT_SECRET){
            throw new Error("Secret Error")
        }
        return await jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"5m"})
    } catch (error) {
        console.error(error);
        throw error
    }
}
export const createRefreshToken = async(id:string):Promise<string>=>{
    try {
        if(!process.env.JWT_SECRET){
            throw new Error("Secret Error")
        }
        return await jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"5d"})
    } catch (error) {
        console.error(error);
        throw error
    }
}