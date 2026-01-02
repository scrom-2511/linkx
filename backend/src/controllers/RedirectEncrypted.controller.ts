import { Request, Response } from "express";
import { LinkModel } from "../model/Link.model";

export const RedirectEncryptedController = async(req:Request,res:Response)=>{
    try {
        const customLink = req.params.link;
        const password = req.body.password;
        const originalLink = await LinkModel.findOne({customLink});
        
        if (originalLink?.password === password) {
            return res.json({message:"Success",link:originalLink?.link})
        }
        res.json({
            message:"Password is incorrect",
            link:originalLink?.link
        })
    } catch (error) {
        console.log(error)
    }
}
