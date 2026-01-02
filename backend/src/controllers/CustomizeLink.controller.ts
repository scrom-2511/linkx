import { Request, Response } from "express";
import { LinkModel } from "../model/Link.model";
import { LinkType } from "../types/Link.type";
import { ShortLinkGenerator } from "../utils/ShortLinkGenerator.util";

export const CustomizeLinkController = async (req: Request, res: Response) => {
  try {
    const validateData = LinkType.safeParse(req.body);
    if (!validateData.success) {
      return res.status(400).json({ errMessage: "This is not a valid URL" });
    }

    const existingUrl = await LinkModel.findOne({
      link: validateData.data.link,
    });
    if (existingUrl) {
      return res.json({
        customLink: existingUrl.customLink,
        message: "The encrypted link for this already exists.",
      });
    }

    const newShortLink = await ShortLinkGenerator();
    await LinkModel.create({ ...req.body, customLink: newShortLink });

    return res.json({ customLink: newShortLink });
  } catch (error) {
    console.error("Error in CustomizeLinkController:", error);
    return res.status(500).json({
      errMessage: "An error occurred while processing your request",
    });
  }
};
