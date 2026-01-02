import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database/database";
import { MainRouter } from "./routes/MainRouter";
const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();
app.use("/", MainRouter);

app.listen(3000);
