import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../errors/cutomError";

export const errorHandler = (error:unknown,req:Request,res:Response,next:NextFunction)=>{
    if (error instanceof CustomError) {
         res.status(error.statusCode).json({
          success: false,
          errors: error.serializeErrors(),
        });
        return
      }
    res.status(500).json({errors:[{message:"Internal Server Error"}]})
}