import { Request, Response } from "express";
import { encryptLinkType } from "../types/encryptLink.type";
import { EncryptLinkModel } from "../model/encryptLink.model";
import { shortLinkGenerator } from "../utils/shortLinkGenerator.util";
import { ERROR_CODES, HttpStatus } from "../types";

export const encryptLink = async (req: Request, res: Response) => {
  try {
    const validateData = encryptLinkType.safeParse(req.body);

    if (!validateData.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: {
          code: ERROR_CODES.INVALID_INPUT.code,
          message: ERROR_CODES.INVALID_INPUT.message,
        },
      });
    }

    const dataExists = await EncryptLinkModel.findOne({
      link: validateData.data.link,
    });

    if (dataExists) {
      return res.status(HttpStatus.OK).json({
        success: true,
        data: {
          shortenedLink: dataExists.encryptedLink,
        },
      });
    }

    let newEncryptedLink = "e-";

    while (true) {
      newEncryptedLink = newEncryptedLink + shortLinkGenerator();
      if (await EncryptLinkModel.findOne({ encryptedLink: newEncryptedLink })) {
        newEncryptedLink = "e-";
      } else {
        break;
      }
    }

    await EncryptLinkModel.create({
      ...req.body,
      encryptedLink: newEncryptedLink,
    });

    return res.status(HttpStatus.OK).json({
      success: true,
      data: {
        encryptedLink: newEncryptedLink,
      },
    });
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
