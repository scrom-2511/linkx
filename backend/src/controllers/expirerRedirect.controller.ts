import { Request, Response } from "express";
import { ExpireLinkModel } from "../model/expireLink.model";

export const expirerRedirect = async (req: Request, res: Response) => {
  try {
    const { expirerLink } = req.body;
    const originalLink = await ExpireLinkModel.findOne({ expirerLink });

    if (!originalLink) {
      return res.redirect("/notfound");
    }

    if (originalLink.dateAndTime) {
      const now = new Date();
      const expiresAt = new Date(originalLink.dateAndTime);

      if (now > expiresAt) {
        return res.redirect("/notfound");
      }
    }

    res.redirect(originalLink.link);
  } catch (error) {
    console.error(error);
    return res.redirect("/someError");
  }
};
