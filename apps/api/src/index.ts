// import express from "express";
// import cors from "cors";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Amethyst Draft Info API - Online");
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`API running on http://localhost:${PORT}`);
// });


import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Amethyst Draft Info API - Online");
});

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Draftroom API is running" });
});

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log("API running on http://localhost:" + PORT));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });