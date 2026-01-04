import { Request, Response } from "express";
import { EncryptLinkModel } from "../model/encryptLink.model";
import { ERROR_CODES, HttpStatus } from "../types";

export const encrypterRedirect = async (req: Request, res: Response) => {
  try {
    const { encryptedLink, password } = req.body.password;
    const originalLink = await EncryptLinkModel.findOne({ encryptedLink });

    if (!originalLink) {
      return res.redirect("/invalidpage");
    }

    if (originalLink?.password === password) {
      return res.redirect(originalLink.link);
    }

    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      success: false,
      error: {
        code: ERROR_CODES.INCORRECT_PASSWORD.code,
        message: ERROR_CODES.INCORRECT_PASSWORD.message,
      },
    });
  } catch (error) {
    console.error(error);
    return res.redirect("/someError");
  }
};
