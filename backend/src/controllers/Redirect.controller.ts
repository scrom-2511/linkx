import { Request, Response } from "express";
import { LinkModel } from "../model/Link.model";

export const RedirectController = async (req: Request, res: Response) => {
  try {
    const customLink = req.params.link;
    const originalLink = await LinkModel.findOne({ customLink });
    if (!originalLink) {
      return res.json({ message: "There is no link for your shortlink." });
    }
    if (originalLink.dateAndTime) {
      const currentDateAndTime = new Date().toISOString();
      if (currentDateAndTime > originalLink.dateAndTime)
        return res.json({ messge: "Link is already expired!" });
    }
    if (originalLink.password) {
      return res.redirect("http://localhost:5173/encrypted" + "?" + customLink);
    }
    res.redirect(originalLink.link!);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Some error from our side!" });
  }
};
