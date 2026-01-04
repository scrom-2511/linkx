import { Request, Response } from "express";
import { expireLinkType } from "../types/expireLink.type";
import { ExpireLinkModel } from "../model/expireLink.model";
import { shortLinkGenerator } from "../utils/shortLinkGenerator.util";
import { ERROR_CODES, HttpStatus } from "../types";

export const expireLink = async (req: Request, res: Response) => {
  try {
    const validateData = expireLinkType.safeParse(req.body);
    if (!validateData.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: {
          code: ERROR_CODES.INVALID_INPUT.code,
          message: ERROR_CODES.INVALID_INPUT.message,
        },
      });
    }

    const dataExists = await ExpireLinkModel.findOne({
      link: validateData.data.link,
    });

    if (dataExists) {
      return res.status(HttpStatus.OK).json({
        success: true,
        data: {
          expirerLink: dataExists.expirerLink,
        },
      });
    }

    let newExpireLink = "x-";

    while (true) {
      newExpireLink = newExpireLink + shortLinkGenerator();
      if (await ExpireLinkModel.findOne({ expirerLink: newExpireLink })) {
        newExpireLink = "x-";
      } else {
        break;
      }
    }

    await ExpireLinkModel.create({
      ...req.body,
      expirerLink: newExpireLink,
    });

    return res.status(HttpStatus.OK).json({
      success: true,
      data: {
        expirerLink: newExpireLink,
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
