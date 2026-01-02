import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  link: { type: String },
  customLink: { type: String },
  password: { type: String },
  dateAndTime: { type: String },
}, {timestamps: true});

export const LinkModel = mongoose.model("Link", LinkSchema);
