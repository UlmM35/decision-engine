import express from "express";
import cors from "cors";
import loanRouter from "./routes/loan";
import { PORT } from "./constants/constants";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/loan", loanRouter);

app.listen(PORT, () => console.log("Running on port 3000"));