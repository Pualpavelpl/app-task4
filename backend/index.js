import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://app-task4.vercel.app",
];

app.use(cors({
  origin: ["http://localhost:5173", "https://app-task4.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));



app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
