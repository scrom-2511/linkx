import { Request, Response } from "express";
import { encrypterRedirect } from "./encrypterRedirect.controller";
import { shortenRedirect } from "./shortenRedirect.controller";
import { ERROR_CODES, HttpStatus } from "../types";

export const redirectController = async (req: Request, res: Response) => {
  try {
    const params = req.params.link;
    if (params.split("-")[0] == "e") {
      await encrypterRedirect(req, res);
    } else if (params.split("-")[0] == "x") {
      return res.redirect("http://localhost:5173/encrypted");
    } else {
      await shortenRedirect(req, res);
    }
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR.code,
        message: ERROR_CODES.INTERNAL_SERVER_ERROR.message,
      },
    });
  }
};
