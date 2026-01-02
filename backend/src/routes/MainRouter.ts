import { Router } from "express";
import { CustomizeLinkController } from "../controllers/CustomizeLink.controller";
import { RedirectController } from "../controllers/Redirect.controller";
import { RedirectEncryptedController } from "../controllers/RedirectEncrypted.controller";

export const MainRouter = Router();

MainRouter.post("/linkCustomizer", (req, res) => {CustomizeLinkController(req, res)});
MainRouter.get("/:link", (req, res) => {RedirectController(req, res)});
MainRouter.post("/encrypted/:link", (req, res) => {RedirectEncryptedController(req, res)});