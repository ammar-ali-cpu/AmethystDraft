import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Amethyst Draft Info API - Online");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
