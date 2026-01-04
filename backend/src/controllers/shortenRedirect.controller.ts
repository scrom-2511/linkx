import { Request, Response } from "express";
import { ShortenLinkModel } from "../model/shortLink.model";

export const shortenRedirect = async (req: Request, res: Response) => {
  try {
    const { link } = req.params;

    const originalLink = await ShortenLinkModel.findOne({
      shortenedLink: link,
    });

    if (!originalLink) {
      return res.status(404).redirect("http://localhost:5173" + "/notFound");
    }

    return res.redirect(originalLink.link);
  } catch (error) {
    console.error("Redirect error:", error);
    return res.redirect("/someError");
  }
};
