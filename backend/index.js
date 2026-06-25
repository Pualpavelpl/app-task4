import "dotenv/config";
import express from "express";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";


const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});